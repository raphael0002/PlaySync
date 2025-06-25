"use client";

import { Component, ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (
    error: Error,
    errorInfo: { componentStack: string }
  ) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: { componentStack: string } | null;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  static getDerivedStateFromError(
    error: Error
  ): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(
    error: Error,
    errorInfo: { componentStack: string }
  ) {
    // Log to console
    console.error(
      "ErrorBoundary caught an error:",
      error,
      errorInfo
    );

    // Update state with error info
    this.setState({ errorInfo });

    // Call optional onError callback
    this.props.onError?.(error, errorInfo);

    // Optional: Send to Sentry (uncomment if Sentry is configured)
    // import * as Sentry from "@sentry/nextjs";
    // Sentry.captureException(error, { extra: errorInfo });
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      // Use custom fallback if provided
      if (fallback) {
        return fallback;
      }

      // Default fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="max-w-md w-full text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Something went wrong
            </h2>
            <p className="text-gray-600">
              An unexpected error occurred. Please try again
              or contact support.
            </p>
            {error && (
              <details className="text-left bg-white p-4 rounded-lg shadow-sm">
                <summary className="cursor-pointer text-red-600">
                  Error Details
                </summary>
                <pre className="mt-2 text-sm text-gray-700 overflow-auto">
                  {error.message}
                  {errorInfo?.componentStack}
                </pre>
              </details>
            )}
            <div className="flex justify-center space-x-4">
              <Button
                onClick={this.resetError}
                className="bg-green-600 hover:bg-green-700"
              >
                Try Again
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                <a href="/support">Contact Support</a>
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return children;
  }
}
