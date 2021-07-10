type WithClassName<P extends Record<string, unknown>> = P
  & {
    className?: string,
  }
