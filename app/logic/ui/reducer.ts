/*
 * @Author: Ren jieyun
 * @Date:   2020-02-20 17:38:05
 * @Last Modified by:   jieyun Ren
 * @Last Modified time: 2020-03-28 16:30:33
 */
import MenuContent from 'containers/Layout/menu';
import {
  TOGGLE_SIDEBAR,
  OPEN_SUBMENU,
  CLOSE_ALL_SUBMENU,
  LOAD_PAGE,
} from './types';

const initialState = {
  sidebarOpen: true,
  pageLoaded: false,
  subMenuOpen: [],
};

const getMenus = menuArray =>
  menuArray.map(item => {
    if (item.child) {
      return item.child;
    }
    return false;
  });

const setNavCollapse = (arr, curRoute) => {
  let headMenu = 'not found';
  for (let i = 0; i < arr.length; i += 1) {
    for (let j = 0; j < arr[i].length; j += 1) {
      if (arr[i][j].link === curRoute) {
        headMenu = MenuContent[i].key;
      }
    }
  }
  return headMenu;
};

export default function reducer(state = initialState, action: any = {}) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case OPEN_SUBMENU:
      const activeParent = setNavCollapse(
        getMenus(MenuContent),
        action.initialLocation
      );
      // Once page loaded will expand the parent menu
      if (action.initialLocation) {
        return { ...state, subMenuOpen: [activeParent] };
      }

      // Expand / Collapse parent menu
      const menuList: any = state.subMenuOpen;
      const inc: string = action.key || '';
      if (menuList.includes(inc)) {
        if (action.keyParent) {
          return { ...state, subMenuOpen: [action.keyParent] };
        } else {
          return { ...state, subMenuOpen: [] };
        }
      } else {
        return { ...state, subMenuOpen: [action.key, action.keyParent] };
      }
    case CLOSE_ALL_SUBMENU:
      return state;
    // return state.withMutations(mutableState => {
    //   mutableState.set('subMenuOpen', List([]));
    // });
    case LOAD_PAGE:
      return { ...state, pageLoaded: action.isLoaded };
    default:
      return state;
  }
}
