import React from "react";

export class ErrorBoundary extends React.Component<
  {
    children: React.ReactNode;
  },
  {
    hasError: boolean;
    error: Error | null;
  }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>出错了</h1>
          {process.env.NODE_ENV === "development" ? (
            <p>{this.state.error?.toString()}</p>
          ) : null}
        </div>
      );
    }
    return this.props.children;
  }
}
