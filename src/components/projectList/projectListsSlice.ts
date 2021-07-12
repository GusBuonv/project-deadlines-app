import { createEntityAdapter, createSlice, EntityId, PayloadAction } from '@reduxjs/toolkit';
import makeEntityStateSelector from '../../util/makeEntityStateSelector';
import { WithId } from '../../util/types';

export type ProjectListEntity = WithId<{
  title: string,
  projectIds: EntityId[],
  displayColor?: string,
}>

const projectListsAdapter = createEntityAdapter<ProjectListEntity>();

const initialState = projectListsAdapter.getInitialState();

const projectListsSlice = createSlice({
  name: 'projectLists',
  initialState,
  reducers: {
    addProjectList: projectListsAdapter.addOne,
    removeProjectList: projectListsAdapter.removeOne,
    removeAllProjectLists: projectListsAdapter.removeAll,
    updateProjectList: projectListsAdapter.updateOne,
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
    addProjectToList(
      state,
      action: PayloadAction<WithId<{ projectId: EntityId }>>,
    ) {
      const { id, projectId } = action.payload;
      const entity = state.entities[id];
      if (entity) {
        if (!entity.projectIds.find((x) => x === projectId)) {
          entity.projectIds.push(projectId);
        }
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
