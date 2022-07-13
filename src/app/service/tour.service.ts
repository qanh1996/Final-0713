import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tour} from "../model/Tour";
import {environment} from "../../environments/environment";

const API_URL = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http: HttpClient) { }

  getAllTour(): Observable<Tour[]> {
    return this.http.get<Tour[]>(API_URL);
  }

  getTourById(id: number): Observable<Tour> {
    return this.http.get<Tour>(API_URL + '/' + id);
  }

  createTour(tour: Tour): Observable<any> {
    return this.http.post<any>(API_URL, tour);
  }

  updateTour(id: number, tour: Tour): Observable<any> {
    return this.http.put(`${API_URL}/${id}`, tour);
  }

  deleteTour(id: number): Observable<any> {
    return this.http.delete<any>(API_URL + '/' + id);
  }
}
