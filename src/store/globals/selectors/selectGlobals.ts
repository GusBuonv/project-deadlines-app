import { RootState } from '../../store';
import { GlobalsState } from '../reducers/globalsReducer';

export default function selectGlobals(state: RootState): GlobalsState {
  return state.globals;
}
