/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, EntityId } from '@reduxjs/toolkit';
import makeEntityStateSelector from '../../util/makeEntityStateSelector';
import { WithId } from '../../util/types';

export type ProjectEntity = WithId<{
  projectListId: EntityId,
  title: string,
  /** ISO date time string */
  deadline: string,
  displayColor?: string,
}>

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
