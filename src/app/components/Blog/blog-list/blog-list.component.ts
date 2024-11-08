import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HashtagService } from 'src/app/service/Blog/hashtag.service';
import { ArticleService } from 'src/app/service/Blog/article.service';
import { Article } from 'src/app/interface/Article/Article.interface';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  displayedArticles: Article[] = [];
  keyword: string = '';  // 存储搜索关键词
  loading: boolean = false;  // 用于指示正在加载数据
  hashtags: string[] = [];  // 存储标签列表


  constructor(private route: ActivatedRoute,
    private ArticleService: ArticleService,
    private hashtagService: HashtagService)
    { }

    ngOnInit(): void {
      // 加载所有文章
      this.loadArticles();

      // 加载标签列表
      this.loadHashtags();
    }

    // 加载所有文章
    loadArticles(): void {
      this.loading = true;
      this.ArticleService.getArticles().subscribe(
        (data) => {
          this.displayedArticles = data;

          // 格式化日期
          this.displayedArticles.forEach(article => {
            article.launchTime = new Date(article.launchTime);
            article.lastUpdateTime = new Date(article.lastUpdateTime);
          });
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching articles', error);
          this.displayedArticles = [];
          this.loading = false;
        }
      );
    }

    // 加载标签列表
    loadHashtags(): void {
      this.hashtagService.getHashtags().subscribe(
        (data) => {
          this.hashtags = data;
        },
        (error) => {
          console.error('加载标签失败', error);
        }
      );
    }

    // 根据标签加载相关的文章
    loadArticlesByHashtag(hashtag: string): void {
      this.loading = true;
      this.hashtagService.getArticlesByHashtag(hashtag).subscribe(
        (data) => {
          this.displayedArticles = data;
          // 格式化日期
          this.displayedArticles.forEach(article => {
            article.launchTime = new Date(article.launchTime);
            article.lastUpdateTime = new Date(article.lastUpdateTime);
          });
          this.loading = false;
        },
        (error) => {
          console.error('加载相关文章失败', error);
          this.displayedArticles = [];
          this.loading = false;
        }
      );
    }

    // 搜索文章
    searchArticles(): void {
      if (this.keyword.trim()) {
        this.loading = true;
        this.ArticleService.searchArticles(this.keyword).subscribe(
          (data) => {
            this.displayedArticles = data;
            this.loading = false;
          },
          (error) => {
            console.error('查詢失敗', error);
            this.displayedArticles = [];
            this.loading = false;
          }
        );
      } else {
        // 如果没有搜索关键词，则加载所有文章
        this.loadArticles();
      }
    }

    deleteArticle(articleNumber: number): void {
      this.ArticleService.deleteArticle(articleNumber).subscribe(
        () => {
          // 删除成功后的处理逻辑（例如刷新文章列表或显示成功消息）
          console.log(`Article ${articleNumber} deleted successfully.`);
        },
        (error) => {
          // 处理错误情况（例如文章未找到）
          console.error('Error deleting article', error);
        }
      );
    }

}
