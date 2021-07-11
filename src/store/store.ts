import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { projectsReducer, projectsSliceName } from '../components/project/projectsSlice';

const makeStore = () => (
  configureStore({
    reducer: {
      [projectsSliceName]: projectsReducer,
    },
  })
);

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch']

export const wrapper = createWrapper<AppStore>(makeStore);
