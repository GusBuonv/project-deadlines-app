import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateProjectInListActionType, CreateProjectInListPayload } from '../../../store/deadlines/actions/createProjectInList';
import { CreateProjectListActionType, CreateProjectListPayload } from '../../../store/deadlines/actions/createProjectList';
import { DestroyAllProjectListsActionType } from '../../../store/deadlines/actions/destroyAllProjectLists';
import { DestroyProjectListActionType, DestroyProjectListPayload } from '../../../store/deadlines/actions/destroyProjectList';
import { RemoveAllProjectsInListActionType, RemoveAllProjectsInListPayload } from '../../../store/deadlines/actions/removeAllProjectsInList';
import { RemoveProjectInListActionType, RemoveProjectInListPayload } from '../../../store/deadlines/actions/removeProjectInList';
import makeEntityStateSelector from '../../../util/makeEntityStateSelector';
import { ProjectListEntity } from '../types';

const projectListsAdapter = createEntityAdapter<ProjectListEntity>();

const initialState = projectListsAdapter.getInitialState();

const projectListsSlice = createSlice({
  name: 'projectLists',
  initialState,
  reducers: {},
  extraReducers: {
    [CreateProjectInListActionType]: (
      state,
      { payload: {
        projectId,
        projectListId,
      } }: PayloadAction<CreateProjectInListPayload>,
    ) => {
      const entity = state.entities[projectListId];
      if (entity) {
        if (!entity.projectIds.find((x) => x === projectId)) {
          entity.projectIds.push(projectId);
        }
      }
    },
    [RemoveAllProjectsInListActionType]: (
      state,
      { payload: { projectListId } }: PayloadAction<RemoveAllProjectsInListPayload>,
    ) => {
      const entity = state.entities[projectListId];
      if (entity) {
        entity.projectIds = [];
      }
    },
    [RemoveProjectInListActionType]: (
      state,
      { payload: {
        projectId,
        projectListId,
      } }: PayloadAction<RemoveProjectInListPayload>,
    ) => {
      const entity = state.entities[projectListId];
      if (entity) {
        const { projectIds } = entity;
        const i = projectIds.indexOf(projectId);
        if (i !== -1) {
          projectIds.splice(i, 1);
        }
      }
    },
    [DestroyProjectListActionType]: (
      state,
      { payload: { projectListId } }: PayloadAction<DestroyProjectListPayload>,
    ) => {
      projectListsAdapter.removeOne(state, projectListId);
    },
    [DestroyAllProjectListsActionType]: projectListsAdapter.removeAll,
    [CreateProjectListActionType]: (
      state,
      { payload: {
        projectListId,
        projectListDisplayId,
      } }: PayloadAction<CreateProjectListPayload>,
    ) => {
      projectListsAdapter.addOne(state, {
        id: projectListId,
        projectIds: [],
        projectListDisplayId,
      });
    },
  },
});

export const projectListsReducer = projectListsSlice.reducer;

export const projectListsSliceName = projectListsSlice.name;

export const {
  selectById: selectProjectListById,
  selectIds: selectProjectListIds,
} = projectListsAdapter.getSelectors(makeEntityStateSelector(projectListsSlice));
