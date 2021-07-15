import { EntityId, Slice } from '@reduxjs/toolkit';
import { Dispatch, SetStateAction } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
type WithClassName<P extends {}> = (
  & P
  & {
    className?: string,
  }
);

interface HasClassName {
  className?: string,
}

interface HasEntityId {
  id: EntityId
}

type SetDuration = Dispatch<SetStateAction<Duration | null>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type NameInSlice<S extends Slice> = S extends Slice<any, any, infer Name> ? Name : never;

type StateInSlice<S extends Slice> = S extends Slice<infer State> ? State : never;

type StateWithSlice<S extends Slice> = {
  [K in NameInSlice<S>]: StateInSlice<S>
}

type EditModes = 'edit' | 'display';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'span' ;

type Mapped<T extends string | number | symbol, V> = {
  [K in T]: V
}

type FlipperDecisionData = EntityState<ProjectListEntity>;

type FlipDecisionCallback = (prev: FlipperDecisionData, current: FlipperDecisionData) => boolean;
