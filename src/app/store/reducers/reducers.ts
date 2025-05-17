import { ActionReducerMap } from "@ngrx/store";
import { AppStates} from "../app-state";
import { sessionReducer } from "./session.reducer";
import { initialSessionState } from "../state/session.state";
import { userReducer } from "./user.reducer";
import { initialUserState } from "../state/user.state";

export const reducers: ActionReducerMap<AppStates> = {
  session: sessionReducer,
  user: userReducer
}

export const initialState = {
  session: initialSessionState,
  user: initialUserState
}
