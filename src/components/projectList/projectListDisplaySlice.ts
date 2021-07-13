import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateProjectListActionType, CreateProjectListPayload } from '../../store/actions/createProjectList';
import { DestroyAllProjectListsActionType } from '../../store/actions/destroyAllProjectLists';
import { DestroyProjectListActionType, DestroyProjectListPayload } from '../../store/actions/destroyProjectList';
import makeEntityStateSelector from '../../util/makeEntityStateSelector';
import { ProjectListDisplayEntity } from './types';

const projectListDisplaysAdapter = createEntityAdapter<ProjectListDisplayEntity>();

const initialState = projectListDisplaysAdapter.getInitialState();

const projectListDisplaysSlice = createSlice({
  name: 'projectListDisplays',
  initialState,
  reducers: {},
  extraReducers: {
    [CreateProjectListActionType]: (
      state,
      { payload: {
        projectListId,
        projectListDisplayId: id,
        options,
      } }: PayloadAction<CreateProjectListPayload>,
    ) => {
      projectListDisplaysAdapter.addOne(state, {
        title: 'New List',
        ...options,
        id,
        projectListId,
      });
    },
    [DestroyProjectListActionType]: (
      state,
      { payload: {
        projectListDisplayId,
      } }: PayloadAction<DestroyProjectListPayload>,
    ) => {
      projectListDisplaysAdapter.removeOne(state, projectListDisplayId);
    },
    [DestroyAllProjectListsActionType]: projectListDisplaysAdapter.removeAll,
  },
});

export const projectListDisplaysReducer = projectListDisplaysSlice.reducer;

export const projectListDisplaysSliceName = projectListDisplaysSlice.name;

export const {
  selectById: selectProjectListDisplayById,
} = projectListDisplaysAdapter.getSelectors(makeEntityStateSelector(projectListDisplaysSlice));
