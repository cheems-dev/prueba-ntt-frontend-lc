import { Component, OnInit } from '@angular/core';
import { SongService } from '../services/song.service';
import { Song } from '../models/Song.model';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.page.html',
  styleUrls: ['./songs-list.page.scss'],
})
export class SongsListPage implements OnInit {
  constructor(private songService: SongService) {}

  ngOnInit() {
    this.songService.getSongs().subscribe((data: Song[]) => {
      console.log(data);
    });
  }
}
