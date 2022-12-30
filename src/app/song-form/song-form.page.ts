import { Component, OnInit } from '@angular/core';
import { Song } from '../models/Song.model';
import { SongService } from '../services/song.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-song-form',
  templateUrl: './song-form.page.html',
  styleUrls: ['./song-form.page.scss'],
})
export class SongFormPage implements OnInit {
  song: Song;

  constructor(
    private songService: SongService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.song = { _id: '', artist: '', song_name: '' };
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.songService.getSongById(id).subscribe(
          (res) => {
            this.song = {
              _id: res._id,
              artist: res?.artist,
              song_name: res?.song_name,
            };
          },
          (error) => console.log(error)
        );
      }
    });
  }

  submitForm(id: string | undefined, song_name: any, artist: any) {
    const songName = song_name.value,
      artistName = artist.value;

    if (songName.length && artistName.length && id) {
      const data: Song = {
        song_name: songName,
        artist: artistName,
      };

      this.songService.updateSongById(id, data).subscribe(
        (res) => this.router.navigate(['/']),
        (error) => console.log(error)
      );
    }
  }
}
