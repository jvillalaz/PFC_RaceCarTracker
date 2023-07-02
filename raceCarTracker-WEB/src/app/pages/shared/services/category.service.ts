import { Category } from "./../models/category-model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  private apiPath = `${environment.URL_API}/category`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http
      .get(this.apiPath)
      .pipe(catchError(this.handleError), map(this.jsonDataToCategories));
  }

  getById(id: number): Observable<Category> {
    const url = `${this.apiPath}/${id}`;
    return this.http
      .get(url)
      .pipe(catchError(this.handleError), map(this.jsonDataToCategory));
  }

  create(category: FormData): Observable<Category> {
    // category.transformer = category.transformer.id;
    return this.http
      .post(this.apiPath, category)
      .pipe(catchError(this.handleError), map(this.jsonDataToCategory));
  }

  update(category: FormData): Observable<Category> {
    const url = `${this.apiPath}/${category.get("id")}`;
    return this.http
      .put(url, category)
      .pipe(catchError(this.handleError), map(this.jsonDataToCategory));
  }

  private jsonDataToCategories(jsonData: any): Category[] {
    const category: Category[] = [];
    jsonData.forEach((element: Category) => category.push(element as Category));
    return category;
  }

  private jsonDataToCategory(jsonData: any): Category {
    return jsonData as Category;
  }

  private handleError(error: any): Observable<any> {
    return throwError(error);
  }
}
