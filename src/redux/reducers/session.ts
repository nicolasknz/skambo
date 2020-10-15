import { USER_INFO } from '../actions/types';

interface ActionTypes {
  type: string;
  token: string;
  currentUser: any;
}

const userInfo = localStorage.getItem('currentUser');

const defaultState = {
  token: localStorage.getItem('token') || '',
  currentUser: userInfo != null ? JSON.parse(userInfo) : {},
};

const session = (state = defaultState, action: ActionTypes): any => {
  switch (action.type) {
    case USER_INFO:
      return { ...state, token: action.token, currentUser: action.currentUser };
    default:
      return state;
  }
};

export default session;
