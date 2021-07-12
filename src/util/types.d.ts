import { Dispatch, SetStateAction } from 'react';

type WithClassName<P extends Record<string, unknown>> = (
  & P
  & {
    className?: string,
  }
);

type SetDuration = Dispatch<SetStateAction<Duration | null>>;
