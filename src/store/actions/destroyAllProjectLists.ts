import { createAction } from '@reduxjs/toolkit';

export const DestroyAllProjectListsActionType = 'deadlines/destroyAllProjectLists';

export type DestroyAllProjectListsPayload = void

const destroyAllProjectLists = createAction<DestroyAllProjectListsPayload>(
  DestroyAllProjectListsActionType,
);

export default destroyAllProjectLists;
