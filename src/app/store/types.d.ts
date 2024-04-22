type StateType = import('./index').store.getState;
type DispatchType = import('./index').store.dispatch;

declare type RootState = ReturnType<typeof StateType>;
declare type AppDispatch = typeof DispatchType;
