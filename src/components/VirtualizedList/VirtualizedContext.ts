import { createContext, Dispatch } from "react";
import { VirtualizedListAction } from "./VirtualizedReducer";

export const VirtualizedContext = createContext<IntersectionObserver>(
  {} as IntersectionObserver
);
export const VirtualizedContextDispatch = createContext<
  Dispatch<VirtualizedListAction>
>({} as Dispatch<VirtualizedListAction>);
