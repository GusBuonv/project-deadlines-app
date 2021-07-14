/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { CreateProjectInListActionType, CreateProjectInListPayload } from '../../store/deadlines/actions/createProjectInList';
import { DestroyAllProjectListsActionType } from '../../store/deadlines/actions/destroyAllProjectLists';
import { DestroyProjectListActionType, DestroyProjectListPayload } from '../../store/deadlines/actions/destroyProjectList';
import { RemoveAllProjectsInListActionType, RemoveAllProjectsInListPayload } from '../../store/deadlines/actions/removeAllProjectsInList';
import { RemoveProjectInListActionType, RemoveProjectInListPayload } from '../../store/deadlines/actions/removeProjectInList';
import makeEntityStateSelector from '../../util/makeEntityStateSelector';
import { ProjectEntity } from './types';

const projectsAdapter = createEntityAdapter<ProjectEntity>();

const initialState = projectsAdapter.getInitialState();

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    updateProject: projectsAdapter.updateOne,
  },
  extraReducers: {
    [CreateProjectInListActionType]: (
      state,
      { payload: {
        projectId,
        projectListId,
        options,
      } }: PayloadAction<CreateProjectInListPayload>,
    ) => {
      projectsAdapter.addOne(state, {
        title: 'New Project',
        // one month ~= 2592000000ms = 30 * 24 * 60 * 60 * 1000
        deadline: new Date(Date.now() + 2592000000).toISOString(),
        displayColor: '#000',
        ...options,
        projectListId,
        id: projectId,
      });
    },
    [RemoveAllProjectsInListActionType]: (
      state,
      { payload: { projectIds } }: PayloadAction<RemoveAllProjectsInListPayload>,
    ) => {
      projectsAdapter.removeMany(state, projectIds);
    },
    [RemoveProjectInListActionType]: (
      state,
      { payload: { projectId } }: PayloadAction<RemoveProjectInListPayload>,
    ) => {
      projectsAdapter.removeOne(state, projectId);
    },
    [DestroyProjectListActionType]: (
      state,
      { payload: { projectIds } }: PayloadAction<DestroyProjectListPayload>,
    ) => {
      projectsAdapter.removeMany(state, projectIds);
    },
    [DestroyAllProjectListsActionType]: projectsAdapter.removeAll,
  },
});

export const projectsReducer = projectsSlice.reducer;

export const projectsSliceName = projectsSlice.name;

export const {
  updateProject,
} = projectsSlice.actions;

export const {
  selectById: selectProjectById,
  selectIds: selectProjectIds,
} = projectsAdapter.getSelectors(makeEntityStateSelector(projectsSlice));
