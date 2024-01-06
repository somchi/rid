import { AppStore } from '../utils/types';

export const SET_ISOPEN = 'SET_ISOPEN';
export const SET_VIEW_TYPE = 'SET_VIEW_TYPE';
export const SET_OPEN_MODAL = 'SET_OPEN_MODAL';
export const SET_EDIT = 'SET_EDIT';

export const appReducer = (state: AppStore, action: any) => {
  switch (action.type) {
    case SET_ISOPEN:
      return {
        ...state,
        isOpen: action.payload,
      };
    case SET_VIEW_TYPE:
      return {
        ...state,
        viewType: action.payload,
      };
    case SET_OPEN_MODAL:
      return {
        ...state,
        isModalOpen: action.payload,
      };
    case SET_EDIT: {
      return {
        ...state,
        edit: action.payload,
      };
    }
    default:
      return state;
  }
};
