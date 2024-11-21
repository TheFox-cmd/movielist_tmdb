import { createContext } from 'react';
import { ReactSetState } from '../types/Utils';
import { RatedMovie } from '../types/Movie';

type UserListContextType = {
  likedList: number[];
  setLikedList: ReactSetState<number[]>;
  ratedList: RatedMovie[];
  setRatedList: ReactSetState<RatedMovie[]>;
};

export const UserListContext = createContext<UserListContextType>({
  likedList: [],
  setLikedList: () => {},
  ratedList: [],
  setRatedList: () => {},
});