/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { CreateProjectInListActionType, CreateProjectInListPayload } from '../../store/actions/createProjectInList';
import { DestroyAllProjectListsActionType } from '../../store/actions/destroyAllProjectLists';
import { DestroyProjectListActionType, DestroyProjectListPayload } from '../../store/actions/destroyProjectList';
import { RemoveAllProjectsInListActionType, RemoveAllProjectsInListPayload } from '../../store/actions/removeAllProjectsInList';
import { RemoveProjectInListActionType, RemoveProjectInListPayload } from '../../store/actions/removeProjectInList';
import makeEntityStateSelector from '../../util/makeEntityStateSelector';
import { ProjectEntity } from './types';

const projectsAdapter = createEntityAdapter<ProjectEntity>();

const initialState = projectsAdapter.getInitialState();

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: projectsAdapter.addOne,
    removeProject: projectsAdapter.removeOne,
    updateProject: projectsAdapter.updateOne,
    removeManyProjects: projectsAdapter.removeMany,
    removeAllProjects: projectsAdapter.removeAll,
  },
  extraReducers: {
    [CreateProjectInListActionType]: (state, action: PayloadAction<CreateProjectInListPayload>) => {
      const {
        projectId,
        projectListId,
        options,
      } = action.payload;

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
      action: PayloadAction<RemoveAllProjectsInListPayload>,
    ) => {
      projectsAdapter.removeMany(state, action.payload.projectIds);
    },
    [RemoveProjectInListActionType]: (
      state,
      { payload }: PayloadAction<RemoveProjectInListPayload>,
    ) => {
      projectsAdapter.removeOne(state, payload.id);
    },
    [DestroyProjectListActionType]: (
      state,
      { payload }: PayloadAction<DestroyProjectListPayload>,
    ) => {
      projectsAdapter.removeMany(state, payload.projectIds);
    },
    [DestroyAllProjectListsActionType]: projectsAdapter.removeAll,
  },
});

export const {
  updateProject,
  removeProject,
  removeManyProjects,
  removeAllProjects,
  addProject,
} = projectsSlice.actions;

export const projectsReducer = projectsSlice.reducer;

export const projectsSliceName = projectsSlice.name;

export const {
  selectById: selectProjectById,
  selectIds: selectProjectIds,
} = projectsAdapter.getSelectors(makeEntityStateSelector(projectsSlice));
