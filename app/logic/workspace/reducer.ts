/*
 * @Author: Ren jieyun
 * @Date:   2020-02-20 17:38:05
 * @Last Modified by:   jieyun Ren
 * @Last Modified time: 2020-04-01 20:09:27
 */
import { CURRENT_WORKSPACE } from './types';

const initialState = {
  currentWorkspace: null,
};

export default function reducer(state = initialState, action: any = {}) {
  switch (action.type) {
    case CURRENT_WORKSPACE:
      return { ...state, currentWorkspace: action.workspace };
    default:
      return state;
  }
}
