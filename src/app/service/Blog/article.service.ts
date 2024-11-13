import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Article } from 'src/app/interface/Article/Article.interface';
import { ArticleCreateDTO } from 'src/app/interface/Article/ArticleCreate.interface';

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

  // 根據文章 ID 獲取單篇文章
  getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${id}`);
  }

 // 刪除文章
 deleteArticle(articleId: number): Observable<void> {
  const url = `${this.apiUrl}/${articleId}`;
  return this.http.delete<void>(url);
}

// 新增文章
createArticle(article: ArticleCreateDTO): Observable<Article> {
  console.log(article)
  return this.http.post<Article>(this.apiUrl, article);
}
}
