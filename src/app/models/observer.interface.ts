export interface Observer {
  onEvent<T>(event: T);
}
