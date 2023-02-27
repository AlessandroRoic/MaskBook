export type VirtualizedListState = {
  [key: string]: (entry: IntersectionObserverEntry) => void;
};

export type VirtualizedListAction = {
  id: string;
  effect: (entry: IntersectionObserverEntry) => void;
};

export const initialState: VirtualizedListState = {};

export const virtualizedReducer = (
  state: VirtualizedListState,
  action: VirtualizedListAction
) => {
  return { ...state, [action.id]: action.effect };
};
