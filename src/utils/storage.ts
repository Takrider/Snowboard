export const STORAGE_KEY = 'snowboard_manager_data';

export const saveData = (data: any) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const loadData = (): any => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};

export const clearData = () => {
  localStorage.removeItem(STORAGE_KEY);
};
