/* eslint-disable no-param-reassign */
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import updatePageTitle, { UpdatePageTitlePayload } from '../actions/updatePageTitle';

export interface GlobalsState {
  pageTitle: string,
}

const initialState: GlobalsState = {
  pageTitle: 'Project Deadlines',
};

export const globalsSliceName = 'globals';

const globalsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updatePageTitle, (
      state: GlobalsState,
      action: PayloadAction<UpdatePageTitlePayload>,
    ) => {
      state.pageTitle = action.payload;
    });
});

export default globalsReducer;
