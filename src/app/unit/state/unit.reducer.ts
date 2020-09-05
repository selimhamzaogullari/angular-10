import {createReducer, on} from "@ngrx/store";
import { selectedUnit} from './units.action';

export const initialState = null;

const _unitReducer = createReducer(
    initialState,
    on(selectedUnit, (state, action) => action.data),
);

export function unitReducer(state, action) {
    return _unitReducer(state, action);
}
