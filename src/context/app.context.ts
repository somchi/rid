import { createContext } from 'react';
import { AppStore, Event } from '../utils/types';
import { EventView } from '../utils/helpers';

export const INITIAL_STATE: AppStore = {
  isOpen: false,
  viewType: EventView.LIST,
  isModalOpen: false,
  edit: {} as Event,
};

export const AppContext = createContext<{
  state: AppStore;
  dispatch: React.Dispatch<any>;
}>({
  state: INITIAL_STATE,
  dispatch: () => null,
});
