import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const router = inject(Router);
  const store = inject(Store<fromApp.AppState>);

  return store.select('auth').pipe(
    take(1),
    map((authState) => {
      return authState.user;
    }),
    map((user) => {
      const isAuth = !!user;
      return isAuth ? true : router.createUrlTree(['/auth']);
    })
  );
};
