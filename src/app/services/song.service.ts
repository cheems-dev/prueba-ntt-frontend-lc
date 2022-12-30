import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Song } from '../models/Song.model';

@Injectable({
  providedIn: 'root',
})
export class SongService {
  API = environment.api;

  constructor(private http: HttpClient) {}

  getSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.API}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(
          () => `Error al obtener las canciones.` + error.message
        );
      })
    );
  }

  getSongById(id: string): Observable<Song> {
    return this.http.get<Song>(`${this.API}/get-song/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(
          () => `Error al obtener canción ${id}.` + error.message
        );
      })
    );
  }

  addSong(song_name: string, artist: string): Observable<Song> {
    const data: Song = { song_name, artist };
    return this.http.post<Song>(`${this.API}/create-song`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(
          () => 'Error al añadir una nueva canción.' + error.message
        );
      })
    );
  }

  deleteSong(id: string): Observable<Song> {
    return this.http.delete<Song>(`${this.API}/delete-song/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => 'Error al borrar canción.' + error.message);
      })
    );
  }

  updateSongById(id: string, song: Song): Observable<Song> {
    return this.http.put<Song>(`${this.API}/update-song/${id}`, song).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => 'Error al actualizar canción.' + error.message);
      })
    );
  }
}
