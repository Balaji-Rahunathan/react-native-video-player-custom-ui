import { useState } from 'react';
import { Dimensions,} from 'react-native';

export const Width = Dimensions.get('window').width;
export const Height = Dimensions.get('window').height;

export const useSetState = (initialState: any) => {
  const [state, setState] = useState(initialState);

  const newSetState = (newState: any) => {
    setState((prevState: any) => ({ ...prevState, ...newState }));
  };
  return [state, newSetState];
};
