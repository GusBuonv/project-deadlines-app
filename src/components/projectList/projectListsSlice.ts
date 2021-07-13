import { createEntityAdapter, createSlice, EntityId, PayloadAction } from '@reduxjs/toolkit';
import { CreateProjectInListActionType, CreateProjectInListPayload } from '../../store/actions/createProjectInList';
import { DestroyAllProjectListsActionType } from '../../store/actions/destroyAllProjectLists';
import { DestroyProjectListActionType, DestroyProjectListPayload } from '../../store/actions/destroyProjectList';
import { RemoveAllProjectsInListActionType, RemoveAllProjectsInListPayload } from '../../store/actions/removeAllProjectsInList';
import { RemoveProjectInListActionType, RemoveProjectInListPayload } from '../../store/actions/removeProjectInList';
import createSliceCaseReducers from '../../util/createSliceCaseReducers';
import makeEntityStateSelector from '../../util/makeEntityStateSelector';
import { WithId } from '../../util/types';
import { ProjectListEntity } from './types';

const projectListsAdapter = createEntityAdapter<ProjectListEntity>();

const initialState = projectListsAdapter.getInitialState();

const myReducers = createSliceCaseReducers(initialState, {
  addProjectToList: (
    state,
    action: PayloadAction<WithId<{ projectId: EntityId }>>,
  ) => {
    const { id, projectId } = action.payload;
    const entity = state.entities[id];
    if (entity) {
      if (!entity.projectIds.find((x) => x === projectId)) {
        entity.projectIds.push(projectId);
      }
    }
  },
  emptyProjectList(
    state,
    action: PayloadAction<EntityId>,
  ) {
    const id = action.payload;
    const entity = state.entities[id];
    if (entity) {
      entity.projectIds = [];
    }
  },
  removeProjectFromList(
    state,
    action: PayloadAction<WithId<{ projectId: EntityId }>>,
  ) {
    const { id, projectId } = action.payload;
    const entity = state.entities[id];
    if (entity) {
      const { projectIds } = entity;
      const i = projectIds.indexOf(projectId);
      if (i !== -1) {
        projectIds.splice(i, 1);
      }
    }
  },
});

const projectListsSlice = createSlice({
  name: 'projectLists',
  initialState,
  reducers: {
    addProjectList: projectListsAdapter.addOne,
    removeProjectList: projectListsAdapter.removeOne,
    removeAllProjectLists: projectListsAdapter.removeAll,
    updateProjectList: projectListsAdapter.updateOne,
    ...myReducers,
  },
  extraReducers: {
    [CreateProjectInListActionType]: (state, action: PayloadAction<CreateProjectInListPayload>) => {
      const {
        projectId,
        projectListId,
      } = action.payload;

      myReducers.addProjectToList(state, {
        payload: {
          projectId,
          id: projectListId,
        },
        type: action.type,
      });
    },
    [RemoveAllProjectsInListActionType]: (
      state,
      { payload, type }: PayloadAction<RemoveAllProjectsInListPayload>,
    ) => {
      myReducers.emptyProjectList(state, {
        payload: payload.id,
        type,
      });
    },
    [RemoveProjectInListActionType]: (
      state,
      { payload, type }: PayloadAction<RemoveProjectInListPayload>,
    ) => {
      myReducers.removeProjectFromList(state, {
        payload: {
          id: payload.projectListId,
          projectId: payload.id,
        },
        type,
      });
    },
    [DestroyProjectListActionType]: (
      state,
      { payload }: PayloadAction<DestroyProjectListPayload>,
    ) => {
      projectListsAdapter.removeOne(state, payload.id);
    },
    [DestroyAllProjectListsActionType]: projectListsAdapter.removeAll,
  },
});

export const {
  updateProjectList,
  removeProjectFromList,
  removeProjectList,
  removeAllProjectLists,
  emptyProjectList,
  addProjectList,
  addProjectToList,
} = projectListsSlice.actions;

export const projectListsReducer = projectListsSlice.reducer;

export const projectListsSliceName = projectListsSlice.name;

export const {
  selectById: selectProjectListById,
  selectIds: selectProjectListIds,
} = projectListsAdapter.getSelectors(makeEntityStateSelector(projectListsSlice));
