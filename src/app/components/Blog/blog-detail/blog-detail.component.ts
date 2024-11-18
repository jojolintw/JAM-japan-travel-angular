import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // 用於獲取路由參數
import { Article } from 'src/app/interface/Article/Article.interface';  // 你的文章接口
import { ArticleService } from 'src/app/service/Blog/article.service';

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

  deleteArticle(articleId: number): void {
    // 在刪除前提供一個確認提示
    if (confirm(`確定要刪除此篇文章嗎?`)) {     // ${articleId}
      // 調用刪除 API
      this.articleService.deleteArticle(articleId).subscribe(
        () => {
          // 刪除成功後的處理邏輯（例如返回上一頁或顯示成功訊息）
          console.log(`Article ${articleId} deleted successfully.`);
          alert(`文章已刪除！`);

          // 刪除後可以返回上一頁
          window.history.back();  // 返回上一頁
        },
        (error) => {
          // 處理錯誤情況
          console.error('Error deleting article', error);
          alert(`刪除文章時發生錯誤：${error.message}`);
        }
      );
    }
  }
}

