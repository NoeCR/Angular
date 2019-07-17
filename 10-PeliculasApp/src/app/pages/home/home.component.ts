import { Component, OnInit, Pipe } from '@angular/core';
import { PeliculasService } from 'src/app/services/peliculas.service';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

interface IMovie {
  adult: boolean,​
  backdrop_path: string,​
  genre_ids: [],        ​
  id: number,        ​
  original_language: string,        ​
  original_title: string,        ​
  overview: string,
  popularity: number,        ​
  poster_path: string,​
  release_date: string,        ​
  title: string,        ​
  video: boolean,        ​
  vote_average: number,
  vote_count: number,
  active: boolean
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  title = 'PeliculasApp';
  populares: any;
  urlImg = 'http://image.tmdb.org/t/p/w500';
  movies: IMovie[] = [];
  loadMovies = false;

  images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  showNavigationArrows = false;
  showNavigationIndicators = false;

  constructor(public peliculasService: PeliculasService,
              public config: NgbCarouselConfig) { }

  async ngOnInit() {
    await this.getPopulares();
  }

  getPopulares() {
    this.loadMovies = false;

    this.peliculasService.getPopulares().toPromise()
    .then(
      ( res: any ) => {
        res.results.forEach( ( movie: any ) => {
          this.movies.push( movie );
        });
      }
    ).catch(
      ( err ) => {
        console.log('Error: ', err );
      }
    )
    .finally(
      () => {
        this.loadMovies = true;
        console.log( this.movies );
      }
    );
  }
  isActive( movie: IMovie, index: number ): boolean {
    if ( this.movies[index].title === movie.title ) {
      movie.active = true;
      return true;
    } else {
      movie.active = false;
      return false;
    }
  }
}
