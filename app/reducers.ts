/*
 * @Author: jieyun Ren
 * @Date:   2020-04-01 20:03:29
 * @Last Modified by:   jieyun Ren
 * @Last Modified time: 2020-04-01 20:03:29
 */
// /**
//  * Combine all reducers in this file and export the combined reducers.
//  */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import uiReducer from 'logic/ui/reducer';
import history from 'utils/history';
import languageReducer from 'logic/language/reducer';
import workspaceReducer from 'logic/workspace/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  return combineReducers({
    router: connectRouter(history),
    ui: uiReducer,
    language: languageReducer,
    workspace: workspaceReducer,
    ...injectedReducers,
  });
}
