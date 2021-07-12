import { EntityId, Slice } from '@reduxjs/toolkit';
import { Dispatch, SetStateAction } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
type WithClassName<P extends {}> = (
  & P
  & {
    className?: string,
  }
);

type WithId<T> = (
  & T
  & { id: EntityId }
);

type SetDuration = Dispatch<SetStateAction<Duration | null>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type NameInSlice<S extends Slice> = S extends Slice<any, any, infer Name> ? Name : never;

type StateInSlice<S extends Slice> = S extends Slice<infer State> ? State : never;

type StateWithSlice<S extends Slice> = {
  [K in NameInSlice<S>]: StateInSlice<S>
};
