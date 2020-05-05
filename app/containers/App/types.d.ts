interface AppState {
  readonly loading: boolean;
  readonly error?: object | boolean;
  readonly currentUser: string;
}

type ContainerState = AppState;

export { ContainerState };
