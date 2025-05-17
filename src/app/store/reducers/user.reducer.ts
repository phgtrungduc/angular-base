import { createReducer, on } from "@ngrx/store";
import { initialUserState } from "../state/user.state";
import { SetUserAction } from "../actions/user.action";

export const userReducer = createReducer(
  initialUserState,
  on(
    SetUserAction,
    (state, data) => ({
      ...state,
      username: data.user.username,
      role: data.user.username
    })
  )
);
