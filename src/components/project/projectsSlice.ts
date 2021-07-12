/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import makeEntityStateSelector from '../../util/makeEntityStateSelector';
import { WithId } from '../../util/types';

export type ProjectEntity = WithId<{
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
  },
});

export const {
  updateProject,
  removeProject,
  addProject,
} = projectsSlice.actions;

export const projectsReducer = projectsSlice.reducer;

export const projectsSliceName = projectsSlice.name;

export const {
  selectById: selectProjectById,
  selectIds: selectProjectIds,
} = projectsAdapter.getSelectors(makeEntityStateSelector(projectsSlice));
