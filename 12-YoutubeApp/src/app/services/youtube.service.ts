import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl: string = 'https://www.googleapis.com/youtube/v3';
  private apiKey: string  = 'API_KEY_DE_YOUTUBE';
  private playlist: string = 'UU3QuZuJr2_EOUak8bWUd74A';
  private nextPageToken: string = '';

  constructor(private http: HttpClient) { }

  getVideos(): Observable<any> {
    let params = new HttpParams();
    params = params.set('part', 'snippet');
    params = params.set('maxResults', '10');
    params = params.set('playlistId', this.playlist);
    params = params.set('key', this.apiKey);

    if ( this.nextPageToken ) {
      params = params.set('pageToken', this.nextPageToken );
    }

    return this.http.get(this.youtubeUrl + '/playlistItems', { params }).pipe(
      map(
        (data: any) => {
          this.nextPageToken = data.nextPageToken;

          let videos: any[] = [];
          for (let video of data.items) {
            let snippet = video.snippet;
            videos.push(snippet);
          }
          return videos;
        }
      )
    );
  }
}
