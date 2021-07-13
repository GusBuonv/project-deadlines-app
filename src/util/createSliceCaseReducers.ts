import { SliceCaseReducers } from '@reduxjs/toolkit';

/**
 * Creates a correctly typed SliceCaseReducers object
 *
 * NOTE: TypeScript cannot infer types using partial type parameter inputs. I.E.
 * if we left of the `_stateHint` argument and tried to call the function as
 * `funcName<MyStateType>(...)` we get a compiler error asking for the second
 * type parameter instead of the parameter being inferred from the input argument.
 *
 * @param _stateHint A dummy variable for TypeScript to rely on in type
 * inference
 * @param reducers The reducers object
 * @returns The correctly typed, unmodified reducers object
 */
export default function createSliceCaseReducers<
  State,
  CaseReducers extends SliceCaseReducers<State>,
>(_stateHint: State, reducers: CaseReducers): CaseReducers {
  return reducers;
}
