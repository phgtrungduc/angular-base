import { createAction, props } from "@ngrx/store";

export const userActionTypes = {
  SET_USER: '[User] Set user',
}

export const SetUserAction = createAction(
  userActionTypes.SET_USER,
  props<{user : any }>()
);
