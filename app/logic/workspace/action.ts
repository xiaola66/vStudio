/*
 * @Author: jieyun Ren
 * @Date:   2020-04-01 19:43:11
 * @Last Modified by:   jieyun Ren
 * @Last Modified time: 2020-04-01 19:57:10
 */
import * as types from './types';

export const setCurrentWorkspaceAction = workspace => ({
  type: types.CURRENT_WORKSPACE,
  workspace,
});
