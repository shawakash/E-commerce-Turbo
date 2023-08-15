import * as React from 'react';
import { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false,  };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    console.log(_)
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>; // Customize the fallback UI
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
