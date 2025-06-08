import React from 'react';
import { Snowboard, SnowboardStatus } from '../types/snowboard';

interface SnowboardListProps {
  snowboards: Snowboard[];
  onUpdateStatus: (id: number, status: SnowboardStatus) => void;
  onUpdateName: (id: number, name: string) => void;
  onSave: () => void;
}

export const SnowboardList: React.FC<SnowboardListProps> = ({ snowboards, onUpdateStatus, onUpdateName, onSave }) => {
  return (
    <div className="space-y-4">
      {snowboards.map((snowboard) => (
        <div key={snowboard.id} className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <input
                type="text"
                value={snowboard.name}
                onChange={(e) => onUpdateName(snowboard.id, e.target.value)}
                className="w-full px-2 py-1 border rounded"
                placeholder="スノーボードの名前"
              />
            </div>
            <select
              value={snowboard.status}
              onChange={(e) => onUpdateStatus(snowboard.id, e.target.value as SnowboardStatus)}
              className="px-3 py-1 border rounded"
            >
              <option value="クリーニング前">クリーニング前</option>
              <option value="クリーニング済み">クリーニング済み</option>
              <option value="滑走ワックス済み">滑走ワックス済み</option>
              <option value="滑走準備完了">滑走準備完了</option>
            </select>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            <p>最終更新: {snowboard.updatedAt.toLocaleString()}</p>
          </div>
        </div>
      ))}
      <div className="mt-4">
        <button
          onClick={onSave}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          データを保存
        </button>
      </div>
    </div>
  );
};
