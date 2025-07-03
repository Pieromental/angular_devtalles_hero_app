import { Component } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``,
})
export class SearchPageComponent {
  public selectedHero: Hero | undefined;
  public searchInput = new FormControl('');
  public herosOptions: Hero[] = [];
  constructor(private heroService: HeroService) {}
  onSelectedOption(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      this.selectedHero = undefined;
      return;
    }
    const hero: Hero = event.option.value;
    this.searchInput.setValue(hero.superhero);
    this.selectedHero = hero;
  }
  searchHero() {
    const value: string = this.searchInput.value || '';
    this.heroService
      .getHeroSuggestions(value)
      .subscribe((heroes) => (this.herosOptions = heroes));
  }
}
