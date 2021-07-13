import { EntityId } from '@reduxjs/toolkit';
import useAppSelector from '../../hooks/useAppSelector';
import { selectProjectListDisplayById } from './projectListDisplaySlice';
import { ProjectListDisplayEntity } from './types';

export default function useProjectListDisplay(id: EntityId): ProjectListDisplayEntity | undefined {
  return useAppSelector((state) => selectProjectListDisplayById(state, id));
}
