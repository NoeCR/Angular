import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styles: []
})
export class ArtistComponent implements OnInit {

  public artist: any = {};
  public tracks: any[] = [];
  public loading: boolean;
  constructor(private route: ActivatedRoute,
              private spotify: SpotifyService) {
    this.loading = true;
    this.route.params.subscribe( params => {
      this.getArtist( params.id );
      this.getTopTracks( params.id );
    });
  }

  ngOnInit() { }

  getArtist( id: string ) {
    this.loading = true;
    this.spotify.getArtist( id )
    .subscribe( data => {
      this.artist = data;
      this.loading = false;
    });
  }

  getTopTracks( id: string ) {
    this.spotify.getTopTracks(id)
        .subscribe( data => {
          console.log(data);
          this.tracks = data;
        });
  }
}
