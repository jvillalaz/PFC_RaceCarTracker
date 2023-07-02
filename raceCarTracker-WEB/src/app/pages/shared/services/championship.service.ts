import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";

export interface Championship {
  _id?: string;
  name: string;
}

@Injectable({
  providedIn: "root",
})
export class ChampionshipService {
  private apiPath = `${environment.URL_API}/championship`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Championship[]> {
    return this.http
      .get(this.apiPath)
      .pipe(catchError(this.handleError), map(this.jsonDataToChampionships));
  }

  getById(id: number): Observable<Championship> {
    const url = `${this.apiPath}/${id}`;
    return this.http
      .get(url)
      .pipe(catchError(this.handleError), map(this.jsonDataToChampionship));
  }

  create(championship: any): Observable<Championship> {
    // championship.transformer = championship.transformer.id;
    return this.http
      .post(this.apiPath, championship)
      .pipe(catchError(this.handleError), map(this.jsonDataToChampionship));
  }

  update(championship: any): Observable<Championship> {
    const url = `${this.apiPath}/${championship.get("id")}`;
    return this.http
      .patch(url, championship)
      .pipe(catchError(this.handleError), map(this.jsonDataToChampionship));
  }

  private jsonDataToChampionships(jsonData: any): Championship[] {
    const championship: Championship[] = [];
    jsonData.forEach((element: Championship) => championship.push(element as Championship));
    return championship;
  }

  private jsonDataToChampionship(jsonData: any): Championship {
    return jsonData as Championship;
  }

  private handleError(error: any): Observable<any> {
    return throwError(error);
  }
}
