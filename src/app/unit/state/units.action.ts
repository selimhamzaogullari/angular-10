import {createAction, props} from "@ngrx/store";

export const selectedUnit = createAction('Selected Unit', props<{data: Object}>());
