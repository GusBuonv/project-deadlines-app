import { createAction, EntityId } from '@reduxjs/toolkit';

export const RemoveProjectInListActionType = 'deadlines/removeProjectInList';

export interface RemoveProjectInListPayload {
  projectId: EntityId,
  projectListId: EntityId,
}

const removeProjectInList = createAction<RemoveProjectInListPayload>(
  RemoveProjectInListActionType,
);

export default removeProjectInList;
