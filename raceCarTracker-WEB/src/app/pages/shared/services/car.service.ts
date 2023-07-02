import { Round } from './../models/round-model';
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { Car } from "../models/car-model";

export interface Track {
  _id: string;
  car: Car;
  round: Round;
}

@Injectable({
  providedIn: "root",
})
export class CarService {
  private apiPath = `${environment.URL_API}/cars`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Car[]> {
    return this.http
      .get(this.apiPath)
      .pipe(catchError(this.handleError), map(this.jsonDataToProcesses));
  }

  getById(id: number): Observable<Car> {
    const url = `${this.apiPath}/${id}`;
    return this.http
      .get(url)
      .pipe(catchError(this.handleError), map(this.jsonDataToCar));
  }

  getCurrentCarTrack(): Observable<Track> {
    const url = `${environment.URL_API}/track/current`;
    return this.http
      .get(url)
      .pipe(catchError(this.handleError), map(this.jsonDataToTrack));
  }

  create(car: Car): Observable<Car> {
    // car.transformer = car.transformer.id;
    return this.http
      .post(this.apiPath, car)
      .pipe(catchError(this.handleError), map(this.jsonDataToCar));
  }

  update(car: FormData): Observable<Car> {
    const url = `${this.apiPath}/${car.get("id")}`;
    return this.http
      .put(url, car)
      .pipe(catchError(this.handleError), map(this.jsonDataToCar));
  }

  private jsonDataToProcesses(jsonData: any): Car[] {
    const car: Car[] = [];
    jsonData.forEach((element: Car) => car.push(element as Car));
    return car;
  }

  private jsonDataToCar(jsonData: any): Car {
    return jsonData as Car;
  }

  private jsonDataToTrack(jsonData: any): Track {
    return jsonData[0] as Track;
  }

  private handleError(error: any): Observable<any> {
    return throwError(error);
  }
}
