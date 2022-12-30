import { ApplicationRef, Component, OnInit } from '@angular/core';
import { SongService } from '../services/song.service';
import { Song } from '../models/Song.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.page.html',
  styleUrls: ['./songs-list.page.scss'],
})
export class SongsListPage implements OnInit {
  songs: Song[] = [];

  isEdit: boolean = false;

  constructor(
    private songService: SongService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadSongs();
  }

  inViewWillEnter() {
    this.loadSongs();
  }

  loadSongs() {
    this.songService.getSongs().subscribe(
      (res) => {
        this.songs = res;
        console.log(
          '🚀 ~ file: songs-list.page.ts:21 ~ SongsListPage ~ loadSongs ~ res',
          res
        );
      },
      (error: Error) => {
        console.log(error);
      }
    );
  }

  createSong(data: Song) {
    this.songService.addSong(data?.artist, data?.song_name).subscribe(
      (res) => this.loadSongs(),
      (error) => console.log(error)
    );
  }

  deleteSong(id: string) {
    this.songService.deleteSong(id).subscribe(
      (res) => {
        console.log(res);
        this.loadSongs();
      },
      (err) => console.log(err)
    );
  }

  async formAlert() {
    const alert = await this.alertController.create({
      header: 'Registrar',
      subHeader: 'Añade una nueva cancion',
      inputs: [
        {
          name: 'song_name',
          placeholder: 'Nombre de la cancion',
          type: 'text',
          attributes: { required: true },
        },
        {
          name: 'artist',
          placeholder: 'Artista',
          type: 'text',
          attributes: {
            required: true,
          },
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Crear',
          handler: (data: Song) => {
            if (data?.artist?.length && data?.song_name?.length)
              this.createSong(data);
          },
        },
      ],
    });

    await alert.present();
  }

  async deleteAlert(id?: string) {
    const alert = await this.alertController.create({
      subHeader: '¿Está seguro que quiere eliminar esta canción?',
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Confirmar',
          handler: () => {
            if (id) this.deleteSong(id);
          },
        },
      ],
    });

    await alert.present();
  }
}
