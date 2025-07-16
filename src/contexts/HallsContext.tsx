import { createContext, useContext, useEffect, useState } from 'react';
import { ApiResponse, Hall, HallsContextType } from '@/types/apiType';
import { api } from '../api/api';

const HallsContext = createContext<HallsContextType>({ halls: [], setHalls: () => {} });

export const HallsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [halls, setHalls] = useState<Array<Hall>>([]);

  useEffect(() => {
    async function getData() {
      const {
        result: { halls },
      } = await api.get<ApiResponse>('/alldata');
      setHalls(halls);
    }
    getData();
  }, []);

  return <HallsContext.Provider value={{ halls, setHalls }}> {children} </HallsContext.Provider>;
};

export const useHalls = () => {
  const context = useContext(HallsContext);
  return context;
};
