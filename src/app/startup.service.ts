import { Injectable, Injector } from "@angular/core";
import { ServiceLocator } from "./common/serviceLocator";
import { Store } from "@ngrx/store";
import { AppStates } from "./store/app-state";
import { LoadBearerTokenAction } from "./store/actions/session.action";
import { SetUserAction } from "./store/actions/user.action";

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  constructor(private injector : Injector, private store: Store<AppStates>){
    ServiceLocator.injector = injector;
  }
  public async init(): Promise<void> {
    this.initBearerToken();
  }

  public initBearerToken(){
    const bearerToken = localStorage.getItem("BearerToken") || "";
    this.store.dispatch(LoadBearerTokenAction({bearerToken}));

    const user = localStorage.getItem("User") || "{}";
    const parseUser = JSON.parse(user);
    this.store.dispatch(SetUserAction({user : {username : parseUser.Username, role : parseUser.Role}}));
  }
}
