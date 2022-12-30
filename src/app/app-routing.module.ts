import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./songs-list/songs-list.module').then(
        (m) => m.SongsListPageModule
      ),
  },
  {
    path: 'edit/:id',
    loadChildren: () =>
      import('./song-form/song-form.module').then((m) => m.SongFormPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
