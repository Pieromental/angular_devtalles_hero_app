import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private baseUrl: string = environments.baseUrl;
  constructor(private http: HttpClient) {}

  getHeros(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }
  getHeroById(heroId: string): Observable<Hero | null> {
    return this.http
      .get<Hero>(`${this.baseUrl}/heroes/${heroId}`)
      .pipe(catchError(() => of(null)));
  }
  getHeroSuggestions(query: string): Observable<Hero[]> {
    const params = new HttpParams().set('q', query).set('_limit', '6');
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`, { params });
  }
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.baseUrl}/heroes${hero.id}`, hero);
  }
  updateHero(hero: Hero): Observable<Hero> {
    if (!hero.id) throw Error('Hero id is required');
    return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
  }
  deleteHeroById(heroId: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/heroes/${heroId}`).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
