import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``,
})
export class HeroPageComponent implements OnInit {
  public hero?: Hero;
  constructor(
    private heroService: HeroService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  goBack(): void {
    this.router.navigateByUrl('/heroes/list');
  }
  findHeroById(): void {
    this.activatedRoute.params
      .pipe(
        delay(1000),
        switchMap(({ id }) => this.heroService.getHeroById(id))
      )
      .subscribe((hero) => {
        if (!hero) return this.goBack();
        return (this.hero = hero);
      });
  }

  ngOnInit(): void {
    this.findHeroById();
  }
}
