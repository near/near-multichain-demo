import { Box, Heading, Text, Flex } from '@chakra-ui/react';
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error: error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);

    this.setState({
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      // Render custom fallback UI using Chakra UI
      return (
        <Flex align="center" justify="center" height="100vh">
          <Box p={4} borderWidth="1px" borderRadius="md">
            <Heading size="lg" mb={2}>
              Something went wrong.
            </Heading>
            <Text mb={4}>
              {this.state.error && this.state.error.toString()}
            </Text>
            <Text>Component Stack Trace:</Text>
            <Text as="pre" whiteSpace="pre-wrap">
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </Text>
          </Box>
        </Flex>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
