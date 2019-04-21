import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  public newSongs: any[] = [];
  public loading: boolean;
  public error: boolean;
  public msg: string;
  constructor(private spotify: SpotifyService) {
    this.loading = true;
    this.error = false;
    this.msg = '';
    this.spotify.getNewReleases()
        .subscribe( (data: any) => {
          this.newSongs = data;
          this.loading = false;
        }, (errorResponse) => {
          this.error = true;
          this.loading = false;
          this.msg = errorResponse.error.error.message;
          console.log(errorResponse);
        });
  }

  ngOnInit() { }

}
