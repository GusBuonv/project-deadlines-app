import { configureStore } from '@reduxjs/toolkit';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { projectsReducer, projectsSliceName } from '../components/project/projectsSlice';
import { projectListDisplaysReducer, projectListDisplaysSliceName } from '../components/projectList/projectListDisplaySlice';
import { projectListsReducer, projectListsSliceName } from '../components/projectList/projectListsSlice';
import globalsReducer, { globalsSliceName } from './globals/reducers/globalsReducer';

/**
 * Enumerated state version storage keys
 *
 * As the app & its state grow in complexity, we risk versions of the state
 * becoming incompatible with one another between app updates. By
 * differentiating these state version via local storage key, we open up the
 * ability to define dynamically imported version migrations to eliminate incompatibilities.
 */
enum stateStorageKeys {
  V1 = 'APP_STATE_V1',
}

const stateStorageKey = stateStorageKeys.V1;

const initialState = {};

const createStore = (preloadedState = initialState) => (
  configureStore({
    reducer: {
      [projectsSliceName]: projectsReducer,
      [projectListsSliceName]: projectListsReducer,
      [projectListDisplaysSliceName]: projectListDisplaysReducer,
      [globalsSliceName]: globalsReducer,
    },
    preloadedState,
  })
);

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

type SetLoadedState = Dispatch<SetStateAction<RootState>>;

let didLoad = false;
function useEffectLoadStateFromStorage(setLoadedState: SetLoadedState) {
  useEffect(() => {
    if (!didLoad) {
      const serializedState = window.localStorage.getItem(stateStorageKey);
      if (serializedState) {
        setLoadedState(() => JSON.parse(serializedState));
      }
      didLoad = true;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

function useEffectPersistStateInStorage(store: AppStore) {
  useEffect(() => {
    const saveState = () => (
      window.localStorage.setItem(
        stateStorageKey,
        JSON.stringify(store.getState()),
      )
    );

    // Limit saving on update to 1/s
    let timeoutId: number | undefined;
    const unsubscribe = store.subscribe(() => {
      if (!timeoutId) {
        // Only set 'beforeunload' listeners when there is unsaved state
        //   See: https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event
        window.addEventListener('beforeunload', saveState);

        timeoutId = window.setTimeout(() => {
          saveState();
          timeoutId = undefined;
          window.removeEventListener('beforeunload', saveState);
        }, 1000);
      }
    });

    return () => {
      unsubscribe();
      window.removeEventListener('beforeunload', saveState);
    };
  }, [store]);
}

export function useStore(): AppStore {
  const [loadedState, setLoadedState] = useState<RootState | typeof initialState>(initialState);
  useEffectLoadStateFromStorage(setLoadedState);
  const store = useMemo(() => createStore(loadedState), [loadedState]);
  useEffectPersistStateInStorage(store);
  return store;
}
