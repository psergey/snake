import { ReactNode } from "react";

export interface ErrorBoundaryProps {
  fallback: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}
