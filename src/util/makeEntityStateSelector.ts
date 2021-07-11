import { EntityState, Slice, SliceCaseReducers } from '@reduxjs/toolkit';

/**
 * A helper for use with EntityAdapter.getSelectors()
 *
 * Pass in a slice whose state is an EntityState and get back the selector to pass to getSelectors
 *
 * @param slice The slice for which an entity state selector function will be generated
 * @returns An entity state selector function for use with EntityAdapter.getSelectors()
 */
export default function makeEntityStateSelector<P, T extends EntityState<P>, N extends string>(
  { name }: Slice<T, SliceCaseReducers<T>, N>,
): ((state: { [K in N]: T }) => T) {
  return (state: { [K in N]: T }) => state[name];
}
