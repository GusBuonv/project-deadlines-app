import { createAction } from '@reduxjs/toolkit';
import { ProjectListEntity } from '../../components/projectList/types';

export const RemoveAllProjectsInListActionType = 'deadlines/removeAllProjectsInList';

export interface RemoveAllProjectsInListPayload extends ProjectListEntity {
}

const removeAllProjectsInList = createAction<RemoveAllProjectsInListPayload>(
  RemoveAllProjectsInListActionType,
);

export default removeAllProjectsInList;
