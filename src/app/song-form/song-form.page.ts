import { Component, OnInit } from '@angular/core';
import { Song } from '../models/Song.model';

@Component({
  selector: 'app-song-form',
  templateUrl: './song-form.page.html',
  styleUrls: ['./song-form.page.scss'],
})
export class SongFormPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  submitForm(song_name: any, artist: any) {
    console.log(song_name.value, artist.value);
  }
}
