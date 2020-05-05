/*
 * @Author: Ren jieyun
 * @Date:   2020-02-20 17:37:42
 * @Last Modified by:   Ren jieyun
 * @Last Modified time: 2020-02-20 17:37:42
 */
/*
 *
 * LanguageProvider reducer
 *
 */
import { CHANGE_LOCALE } from './types';
import { DEFAULT_LOCALE } from '../../i18n';

export const initialState = {
  locale: DEFAULT_LOCALE,
};

const languageProviderReducer = (state: any = initialState, action: any) => {
  // switch (action.type) {
  //   case CHANGE_LOCALE:
  //     return { ...state, locale: action.locale };
  //   default:
  //     return state;
  // }
  if (action.type === CHANGE_LOCALE) {
    return { ...state, locale: action.locale };
  } else {
    return state;
  }
};

export default languageProviderReducer;
