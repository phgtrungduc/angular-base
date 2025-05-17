import { createAction, props } from "@ngrx/store";

export const sessionActionTypes = {
  LOAD_BEARER_TOKEN: '[Session] Load BearerToken',
}

export const LoadBearerTokenAction = createAction(
  sessionActionTypes.LOAD_BEARER_TOKEN,
  props<{bearerToken : string }>()
);
