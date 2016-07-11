import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { Router } from '@angular/router';
import { HeroDetailComponent } from './hero-detail.component';

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/heroes.component.html',
  styleUrls:  ['app/heroes.component.css'],
	directives: [HeroDetailComponent]
})


export class HeroesComponent implements OnInit {


	heroes: Hero[];
	selectedHero: Hero;
	addingHero = false;
	error: any;

  constructor(
    private router: Router,
    private heroService: HeroService) { 
			/* No heavy lifting in Constructor!.. Using life-cycle hook instead */
	}

	deleteHero(hero: Hero, event: any) {
		event.stopPropagation();
		this.heroService
				.delete(hero)
				.then(res => {
					this.heroes = this.heroes.filter(h => h !== hero);
					if (this.selectedHero === hero) { this.selectedHero = null; }
				})
				.catch(error => this.error = error); // TODO: Display error message
	}
	
	addHero() {
		this.addingHero = true;
		this.selectedHero = null;
	}

	close(savedHero: Hero) {
		this.addingHero = false;
		if (savedHero) { this.getHeroes(); }
	}
	
	ngOnInit() {
		this.getHeroes();
  }
	
  getHeroes() {
    this.heroService
				.getHeroes()
				.then(heroes => this.heroes = heroes)
				.catch(error => this.error = error);
  }
	
	onSelect(hero: Hero) { 
		this.selectedHero = hero; 
	}
	
  gotoDetail() {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

}
