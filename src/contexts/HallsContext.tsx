import { createContext, useContext, useState } from 'react';
import { ApiResponse, Hall } from '@/types/apiType';
import { api } from '@/api/api';

const HallsContext = createContext<Array<Hall> | undefined>(undefined);

export const HallsProvider: React.FC = () => {
  const [data, setData] = useState<Array<Hall> | undefined>(undefined);
  async function getData() {
    const {
      result: { halls },
    } = await api.get<ApiResponse>('/alldata');
    setData(halls)
  }
  getData()
  return <HallsContext.Provider value={data}></HallsContext.Provider>;
};

export const useHalls = () => {
    const context = useContext(HallsContext)
    return context
}