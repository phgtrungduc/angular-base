import { createSelector } from "@ngrx/store";
import { SessionState } from "./state/session.state";
import { UserState } from "./state/user.state";

export interface AppStates {
  session: SessionState;
  user : UserState;
}

export const getSession = (state: AppStates) => state.session;
export const getBearerToken = createSelector(getSession, session => session.BearerToken);

export const getCurrentUser = (state: AppStates) => state.user;
