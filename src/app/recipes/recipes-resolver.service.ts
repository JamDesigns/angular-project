// Antes
//
// import { Injectable } from '@angular/core';
// import {
//   ActivatedRouteSnapshot,
//   Resolve,
//   RouterStateSnapshot,
// } from '@angular/router';

// import { Recipe } from './recipe.model';
// import { DataStorageService } from '../shared/data-storage.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class RecipesResolverService implements Resolve<Recipe[]> {
//   constructor(private dataStorageService: DataStorageService) {}

//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     return this.dataStorageService.fetchRecipes();
//   }
// }

import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

export const RecipesResolverService: ResolveFn<Recipe[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  dataStorageService: DataStorageService = inject(DataStorageService),
  recipeService: RecipeService = inject(RecipeService)
): Observable<Recipe[]> => {
  return dataStorageService.fetchRecipes();
};
