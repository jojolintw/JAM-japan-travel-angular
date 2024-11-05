import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // 假设你有这个服务来获取文章数据
import { Article } from 'src/app/interface/Article/Article.interface';  // 假设你有这个接口
import { ArticleService } from 'src/app/service/Blog/article-service/article.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  articleId: number | null = null;  // 初始為 null，或者你可以使用 0 或其他預設值
  article: Article | null = null;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    // 获取路由参数中的 articleId
    this.articleId = +this.route.snapshot.paramMap.get('id')!;  // 使用 + 转换为数字

    // 调用服务获取文章详情
    this.articleService.getArticleById(this.articleId).subscribe(
      (data) => {
        this.article = data;
      },
      (error) => {
        console.error('Article not found', error);
      }
    );
  }
}

