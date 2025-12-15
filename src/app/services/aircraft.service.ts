import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aircraft } from '../models/aircraft';
import { AircraftType } from '../models/aircraft-type';
import { CreateAircraftDto } from '../models/create-aircraft-dto';
import { UpdateAircraftDto } from '../models/update-aircraft-dto';

@Injectable({
  providedIn: 'root'
})
export class AircraftService {
  private readonly apiUrl = 'http://localhost:5155/api';

  constructor(private http: HttpClient) { }

  getAllAircraft(): Observable<Aircraft[]> {
    return this.http.get<Aircraft[]>(`${this.apiUrl}/aircraft`);
  }

  getAircraftById(id: string): Observable<Aircraft> {
    return this.http.get<Aircraft>(`${this.apiUrl}/aircraft/${id}`);
  }

  createAircraft(dto: CreateAircraftDto): Observable<Aircraft> {
    return this.http.post<Aircraft>(`${this.apiUrl}/aircraft`, dto);
  }

  updateAircraft(id: string, dto: UpdateAircraftDto): Observable<Aircraft> {
    return this.http.put<Aircraft>(`${this.apiUrl}/aircraft/${id}`, dto);
  }

  deleteAircraft(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/aircraft/${id}`);
  }

  getAircraftTypes(): Observable<AircraftType[]> {
    return this.http.get<AircraftType[]>(`${this.apiUrl}/aircrafttypes`);
  }
}
