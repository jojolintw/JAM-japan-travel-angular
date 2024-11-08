import { HttpClient, HttpParams } from '@angular/common/http';
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

  searchArticles(keyword: string): Observable<Article[]> {
    if (!keyword.trim()) {
      return new Observable<Article[]>();  // 如果关键词为空，返回一个空的 Observable
    }

    const params = new HttpParams().set('keyword', keyword);  // 设置查询参数
    const searchUrl = `${this.apiUrl}/search`;  // 后端搜索 API 的路径

    return this.http.get<Article[]>(searchUrl, { params });  // 发送 GET 请求，传递查询参数
  }

  // 根据文章 ID 获取单篇文章
  getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${id}`);
  }


 deleteArticle(articleNumber: number): Observable<void> {
  const url = `${this.apiUrl}/articles/${articleNumber}`;
  return this.http.delete<void>(url);
}


}
