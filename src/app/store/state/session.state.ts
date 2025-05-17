export interface SessionState {
  BearerToken : string;
}

export const initialSessionState: SessionState = {
  BearerToken : localStorage.getItem("BearerToken") || ""
}
