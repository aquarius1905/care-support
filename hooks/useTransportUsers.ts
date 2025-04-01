import { useState } from 'react';
import { TransportUser } from '@/types';

export const useTransportUsers = (initialData: TransportUser[]) => {
  const [transportUsers, setTransportUsers] = useState<TransportUser[]>(initialData);

  const updateTransportTime = (id: number, newTime: string) => {
    setTransportUsers(transportUsers.map(user => 
      user.id === id 
        ? { ...user, time: newTime } 
        : user
    ));
  };

  return {
    transportUsers,
    updateTransportTime
  };
};