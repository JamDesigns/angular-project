import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private Http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();

    this.Http.put(
      'https://ng-course-recipe-book-c4e0a-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
      recipes
    ).subscribe((response) => {
      // console.log(response);
    });
  }

  fetchRecipes() {
    return this.Http.get<Recipe[]>(
      'https://ng-course-recipe-book-c4e0a-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
    ).pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
