import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {RecipesService} from '../core/services/recipes.service';
import {combineLatest, map} from "rxjs";

@Component({
    selector: 'app-recipes-list',
    templateUrl: './recipes-list.component.html',
    styleUrls: ['./recipes-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesListComponent implements OnInit {
    recipes$ = this.service.recipes$;
    filteredRecipes$ = combineLatest([
        this.recipes$,
        this.service.filterRecipesAction$
    ]).pipe(
        map(([recipes, filter]) => {
            return recipes.filter(recipe =>
                recipe.title?.toLowerCase()
                    .indexOf(filter?.title?.toLowerCase() ?? '') != -1);
        })
    );

    constructor(private service: RecipesService) {
    }

    ngOnInit(): void {
    }
}
