import { EntityId } from '@reduxjs/toolkit';
import useAppSelector from '../../hooks/useAppSelector';
import { selectProjectListById } from './projectListsSlice';
import { ProjectListEntity } from './types';

export default function useProjectList(id: EntityId): ProjectListEntity | undefined {
  return useAppSelector((state) => selectProjectListById(state, id));
}
