import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Round } from "../models/round-model";

@Injectable({
  providedIn: "root",
})
export class RoundService {
  private apiPath = `${environment.URL_API}/rounds`;
  private apiPathTrack = `${environment.URL_API}/track`;
  constructor(private http: HttpClient) { }



  sendCarTrack(car: any): Observable<Round> {
    // round.transformer = round.transformer.id;
    return this.http
      .post(this.apiPathTrack, car)
      .pipe(catchError(this.handleError), map(this.jsonDataToRound));
  }

  getAll(): Observable<Round[]> {
    return this.http
      .get(this.apiPath)
      .pipe(catchError(this.handleError), map(this.jsonDataToRounds));
  }

  getById(id: string): Observable<Round> {
    const url = `${this.apiPath}/${id}`;
    return this.http
      .get(url)
      .pipe(catchError(this.handleError), map(this.jsonDataToRound));
  }

  getRoundsByChampionship(id: number): Observable<Round> {
    const url = `${this.apiPath}/byChampionship/${id}`;
    return this.http
      .get(url)
      .pipe(catchError(this.handleError), map(this.jsonDataToRound));
  }

  create(round: any): Observable<Round> {
    // round.transformer = round.transformer.id;
    return this.http
      .post(this.apiPath, round)
      .pipe(catchError(this.handleError), map(this.jsonDataToRound));
  }

  update(round: any): Observable<Round> {
    const url = `${this.apiPath}/${round.get("id")}`;
    return this.http
      .put(url, round)
      .pipe(catchError(this.handleError), map(this.jsonDataToRound));
  }

  private jsonDataToRounds(jsonData: any): Round[] {
    const round: Round[] = [];
    jsonData.forEach((element: Round) => round.push(element as Round));
    return round;
  }

  private jsonDataToRound(jsonData: any): Round {
    return jsonData as Round;
  }

  private handleError(error: any): Observable<any> {
    return throwError(error);
  }
}
