import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, timer} from 'rxjs';
import {Recipe} from '../model/recipe.model';
import {delayWhen, retryWhen, tap} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
const BASE_PATH = environment.basePath;

@Injectable({
    providedIn: 'root'
})

export class RecipesService {
    recipes$ = this.http.get<Recipe[]>(`${BASE_PATH}/recipes`).pipe(
        retryWhen(errors => {
            return errors.pipe(
                delayWhen(() => timer(5000)),
                tap(() => console.log('Retrying the HTTP request...'))
            );
        }),
    );
    /*Create The action stream */
    private filterRecipeSubject = new BehaviorSubject<Recipe>({title:''});
    /* Extract The readonly stream */
    filterRecipesAction$ = this.filterRecipeSubject.asObservable();

    constructor(private http: HttpClient) {
    }

    updateFilter(criteria:Recipe) {
        this.filterRecipeSubject.next(criteria);
    }
}
