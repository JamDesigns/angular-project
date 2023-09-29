import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, map, of, switchMap, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

import { Recipe } from './recipe.model';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from './store/recipe.actions';

export const RecipesResolverService: ResolveFn<Recipe[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<Recipe[]> => {
  const store = inject(Store<fromApp.AppState>);
  const actions$ = inject(Actions);

  return store.select('recipes').pipe(
    take(1),
    map((recipesState) => {
      return recipesState.recipes;
    }),
    switchMap((recipes) => {
      if (recipes.length === 0) {
        store.dispatch(new RecipesActions.FetchRecipes());
        return actions$.pipe(ofType(RecipesActions.SET_RECIPES), take(1));
      } else {
        return of(recipes);
      }
    })
  );
};
