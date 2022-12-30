import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { SongService } from './song.service';
import { Song } from '../models/Song.model';
import { environment } from 'src/environments/environment';

describe('SongService', () => {
  let service: SongService;
  let httpTestingController: HttpTestingController;
  let song: Song;
  let API: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(SongService);
    API = environment.api;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call GET with correct URL', () => {
    const req = httpTestingController.expectOne(`${API}`);

    req.flush([]);
    expect(req.request.url).toBe(`${API}`);
    expect(req.request.method).toBe('GET');
    httpTestingController.verify();
  });
});
