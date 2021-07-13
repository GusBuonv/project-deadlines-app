import { createAction } from '@reduxjs/toolkit';
import { ProjectListEntity } from '../../components/projectList/types';

export const DestroyProjectListActionType = 'deadlines/destroyProjectList';

export interface DestroyProjectListPayload extends ProjectListEntity {
}

const destroyProjectList = createAction<DestroyProjectListPayload>(
  DestroyProjectListActionType,
);

export default destroyProjectList;
