import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/interface/Article/Article.interface';
import { Hashtag } from 'src/app/interface/Article/Hashtag.interface';

@Injectable({
  providedIn: 'root'
})
export class HashtagService {

  private apiUrl = 'https://localhost:7100/api/FBlog';

  constructor(private http: HttpClient) { }

  // 获取所有 Hashtag
  getHashtags(): Observable<Hashtag[]> {
    return this.http.get<Hashtag[]>(`${this.apiUrl}/hashtags`);
  }

  // 根据 Hashtag 获取相关的文章
  getArticlesByHashtag(hashtag: Hashtag): Observable<Article[]> {
    const params = { 'hashtag': hashtag.name };
    return this.http.get<Article[]>(`${this.apiUrl}/articles-by-hashtag`, { params });
  }

}
