import { EntityId } from '@reduxjs/toolkit';
import useAppSelector from '../../hooks/useAppSelector';
import { ProjectListEntity, selectProjectListById } from './projectListsSlice';

export default function useProjectList(id: EntityId): ProjectListEntity | undefined {
  return useAppSelector((state) => selectProjectListById(state, id));
}
