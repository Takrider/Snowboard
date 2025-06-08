import { useState, useEffect } from 'react';
import { Snowboard, SnowboardStatus } from './types/snowboard';
import { SnowboardList } from './components/SnowboardList';
import { saveData, loadData } from './utils/storage';

function App() {
  const [snowboards, setSnowboards] = useState<Snowboard[]>(() => {
    const savedData = loadData();
    if (savedData && savedData.snowboards) {
      return savedData.snowboards;
    }
    return [
      {
        id: 1,
        name: 'Snowboard 1',
        status: 'クリーニング前',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Snowboard 2',
        status: 'クリーニング済み',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  });

  const [nextId, setNextId] = useState(() => {
    const savedData = loadData();
    return savedData?.nextId || 3;
  });

  const saveCurrentData = () => {
    saveData({
      snowboards: snowboards,
      nextId: nextId
    });
  };

  useEffect(() => {
    saveCurrentData();
  }, [snowboards, nextId]);

  const handleAddSnowboard = () => {
    const newSnowboard: Snowboard = {
      id: nextId,
      name: `Snowboard ${nextId}`,
      status: 'クリーニング前',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setSnowboards(prev => [...prev, newSnowboard]);
    setNextId(prev => prev + 1);
  };

  const handleUpdateStatus = (id: number, status: SnowboardStatus) => {
    setSnowboards(prev =>
      prev.map(snowboard =>
        snowboard.id === id
          ? { ...snowboard, status, updatedAt: new Date() }
          : snowboard
      )
    );
  };

  const handleUpdateName = (id: number, name: string) => {
    setSnowboards(prev =>
      prev.map(snowboard =>
        snowboard.id === id
          ? { ...snowboard, name, updatedAt: new Date() }
          : snowboard
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">スノーボード管理アプリ</h1>
        
        <div className="mb-6">
          <button
            onClick={handleAddSnowboard}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            新規スノーボード追加
          </button>
        </div>

        <SnowboardList 
          snowboards={snowboards}
          onUpdateStatus={handleUpdateStatus}
          onUpdateName={handleUpdateName}
          onSave={saveCurrentData}
        />
      </div>
    </div>
  );
}

export default App;
