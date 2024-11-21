import { createContext } from 'react';
import { ReactSetState } from '../types/Utils';
import { UserData } from '../types/LoginForm';

type LoginContextType = {
  userData: UserData | null;
  setUserData: ReactSetState<UserData | null> ;
};

export const LoginContext = createContext<LoginContextType>({
  userData: null,
  setUserData: () => {},
});