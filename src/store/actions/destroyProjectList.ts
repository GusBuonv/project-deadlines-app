import { createAction, EntityId } from '@reduxjs/toolkit';

export const DestroyProjectListActionType = 'deadlines/destroyProjectList';

export interface DestroyProjectListPayload {
  projectListId: EntityId,
  projectIds: EntityId[],
  projectListDisplayId: EntityId,
}

const destroyProjectList = createAction<DestroyProjectListPayload>(
  DestroyProjectListActionType,
);

export default destroyProjectList;
