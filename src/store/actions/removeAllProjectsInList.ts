import { createAction, EntityId } from '@reduxjs/toolkit';

export const RemoveAllProjectsInListActionType = 'deadlines/removeAllProjectsInList';

export interface RemoveAllProjectsInListPayload {
  projectIds: EntityId[],
  projectListId: EntityId,
}

const removeAllProjectsInList = createAction<RemoveAllProjectsInListPayload>(
  RemoveAllProjectsInListActionType,
);

export default removeAllProjectsInList;
