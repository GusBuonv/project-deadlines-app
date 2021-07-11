/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import makeEntityStateSelector from '../../util/makeEntityStateSelector';
import { WithId } from '../../util/types';
import { ProjectProps } from './project';

export type ProjectEntity = WithId<ProjectProps>

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
  extraReducers: {
    [HYDRATE](state, action) {
      return {
        ...state,
        ...action.payload.projects,
      };
    },
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
  selectAll: selectAllProjects,
} = projectsAdapter.getSelectors(makeEntityStateSelector(projectsSlice));
