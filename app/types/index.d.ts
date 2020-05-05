import { Reducer, Store } from 'redux';
import { RouterState } from 'connected-react-router';
import { ContainerState as AppState } from 'containers/App/types';

export interface InjectedStore extends Store {
  injectedReducers: any;
}

export interface InjectReducerParams {
  key: keyof ApplicationRootState;
  reducer: Reducer<any, any>;
}

// Your root reducer type, which is your redux state types also
export interface ApplicationRootState {
  readonly router: RouterState;
  readonly global: AppState;

  // for testing purposes
  readonly test: any;
}
