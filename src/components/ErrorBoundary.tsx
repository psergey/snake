import { ErrorInfo, Component, ReactNode, PropsWithChildren } from "react";

import { ErrorBoundaryProps, ErrorBoundaryState } from "./ErrorBoundary.type";

export default class ErrorBoundary extends Component<
  PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Caught an error: ", error, errorInfo);
    this.setState({ hasError: true });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
