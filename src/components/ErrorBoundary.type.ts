import { ReactNode } from "react";

export interface Props {
  fallback: ReactNode;
}

export interface State {
  hasError: boolean;
}
