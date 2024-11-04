import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Article } from 'src/app/interface/Article/Article.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private apiUrl = 'https://localhost:7100/api/FBlog';

  constructor(private http: HttpClient) { }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl);
  }
}
