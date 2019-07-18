import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public videos: any[] = [];
  public videoSel: any;

  constructor(private yts: YoutubeService) {
    this.yts.getVideos().subscribe(
      result => {
        console.log('Results:\n', result);
        this.videos = result;
      }
    );
  }

  ngOnInit() { }

  verVideo( video: any ) {
    this.videoSel = video;
    $('#modal').modal();
  }

  cerrarModal() {
    this.videoSel = null;
    $('#modal').modal('hide');
  }

  cargarMas( ) {
    this.yts.getVideos().subscribe( result => this.videos.push.apply( this.videos, result) );
  }
}
