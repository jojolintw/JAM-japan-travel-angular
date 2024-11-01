import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Article } from 'src/app/interface/Product/Article.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private apiUrl = 'http://localhost:4200/api/xxxxx';

  constructor(private http: HttpClient) { }

  getArticle(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl);
  }
}
