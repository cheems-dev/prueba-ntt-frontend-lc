import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Song } from '../models/Song.model';

@Injectable({
  providedIn: 'root',
})
export class SongService {
  URL = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}

  getSongs(): Observable<Song[]> {
    return this.http.get<Song[]>('http://localhost:3000/api');
  }

  addSong(): Observable<Song[]> {
    return this.http
      .get<Song[]>('http://localhost:3000/api' + '/create-song')
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error.message);
          return throwError('Error while creating a todo' + error.message);
        })
      );
  }

  /*   updateSongById(song: Song, id: string): Observable<Song> {
    this.http.put<Song>('http://localhost:3000/api', todo).pipe(
      catchError((error: HttpErrorResponse) => {
        // this.errorHandler.log("Error while updating a todo", error);
        console.log(error.message);
        return throwError('Error while updating a todo ' + error.message);
      })
    );
  } */
}
