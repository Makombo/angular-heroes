import { Component } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/heroes.component.html',
  styleUrls:  ['app/heroes.component.css']
})


export class HeroesComponent implements OnInit {

  title = 'Tour of Heroes';
	heroes: Hero[];
	selectedHero: Hero;
	router: Router;

  constructor(
    private router: Router,
    private heroService: HeroService) { 
			/* No heavy lifting in Constructor!.. Using life-cycle hook instead */
	}
	
	ngOnInit() {
		this.getHeroes();
  }
	
  getHeroes() {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }
	
	onSelect(hero: Hero) { 
		this.selectedHero = hero; 
	}
	
  gotoDetail() {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

}
