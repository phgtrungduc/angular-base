import { CanActivateFn, Router } from '@angular/router';
import { ServiceLocator } from '../common/serviceLocator';
import { Store } from '@ngrx/store';
import { AppStates, getBearerToken } from '../store/app-state';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const store = ServiceLocator.injector.get(Store<AppStates>);
  const router = ServiceLocator.injector.get(Router);
  const path = state.url;
  const isLoginPath = path.includes("login");
  return store.select(getBearerToken).pipe(
    map((bearerToken) => {
      if (isLoginPath && !bearerToken || bearerToken == "") return true;
      if (!isLoginPath && bearerToken != null && bearerToken != "") return true;
      if (isLoginPath) {
        router.navigate(['/retailer']);
      } else {
        router.navigate(['/login']);
      }
      return false;
    }))
};
