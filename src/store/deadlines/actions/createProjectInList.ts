import { createAction, EntityId } from '@reduxjs/toolkit';
import { ProjectOptions } from '../../../components/project/types';

export const CreateProjectInListActionType = 'deadlines/createProjectInList';

export interface CreateProjectInListPayload {
  projectId: EntityId,
  projectListId: EntityId,
  options?: Partial<ProjectOptions>
}

const createProjectInList = createAction<CreateProjectInListPayload>(CreateProjectInListActionType);

export default createProjectInList;
