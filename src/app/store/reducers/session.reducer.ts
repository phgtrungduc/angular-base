import { createReducer, on } from "@ngrx/store";
import { LoadBearerTokenAction, sessionActionTypes } from "../actions/session.action";
import { initialSessionState, SessionState } from "../state/session.state";

export const sessionReducer = createReducer(
  initialSessionState,
  on(
    LoadBearerTokenAction,
    (state, bearerToken) => ({ ...state,
    BearerToken: bearerToken.bearerToken  })
  )
);
