import { useEffect, useState } from 'react';
import { api } from '../../api/api';
import { ApiResponse } from '@/types/apiType';

const ManagmentHall: React.FC = () => {
  const [halls, setHall] = useState<string[] | null>(null);

  useEffect(() => {
    async function getData() {
      const {
        result: { halls },
      } = await api.get<ApiResponse>('/alldata');

      const data = halls.reduce((acc, element) => {
        acc.push(element.hall_name);
        return acc;
      }, [] as string[]);
      setHall(data);
    }
    getData();
  }, []);

  console.log(halls);

  return <></>;
};

export default ManagmentHall;
