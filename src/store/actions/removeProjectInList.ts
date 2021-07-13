import { createAction } from '@reduxjs/toolkit';
import { ProjectEntity } from '../../components/project/types';

export const RemoveProjectInListActionType = 'deadlines/removeProjectInList';

export interface RemoveProjectInListPayload extends ProjectEntity {
}

const removeProjectInList = createAction<RemoveProjectInListPayload>(
  RemoveProjectInListActionType,
);

export default removeProjectInList;
