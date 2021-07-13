import { createAction, EntityId } from '@reduxjs/toolkit';
import { ProjectListDisplayOptions } from '../../components/projectList/types';

export const CreateProjectListActionType = 'deadlines/createProjectList';

export interface CreateProjectListPayload {
  projectListId: EntityId,
  projectListDisplayId: EntityId,
  options?: Partial<ProjectListDisplayOptions>
}

const createProjectList = createAction<CreateProjectListPayload>(CreateProjectListActionType);

export default createProjectList;
