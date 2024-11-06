import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/service/Blog/article-service/article.service';
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

  constructor(private route: ActivatedRoute, private ArticleService: ArticleService) { }

  ngOnInit(): void {
    this.ArticleService.getArticles().subscribe((data: Article[]) => {
      this.displayedArticles = data;

      // 迭代每篇文章，打印發文時間和最新修改時間
      this.displayedArticles.forEach(article => {
        article.launchTime = new Date(article.launchTime);
        article.lastUpdateTime = new Date(article.lastUpdateTime);

      });
    }, (error) => {
      console.error('Error fetching articles', error);
    });
  }

  clickTest() {
    alert('here');
  }

  searchArticles(): void {
    if (this.keyword.trim()) {
      // 每次搜索前清空文章列表
      // this.articles = [];
      this.loading = true; // 开始加载数据

      this.ArticleService.searchArticles(this.keyword).subscribe(
        (data) => {
          this.displayedArticles = data;
          this.loading = false;  // 加载完成
          // this.displayedArticles[0].articleContent = 'TEST'

        },
        (error) => {
          console.error('查詢失敗', error);
          // console.error('查詢失敗', error.status);  // 错误处理
          this.displayedArticles =[];
          this.loading = false;  // 加载完成
        }
      );
    }

    else {
      // 如果没有关键词，加载所有文章
      this.loading = true;  // 开始加载数据
      this.ArticleService.getArticles().subscribe(
        (data) => {
          this.displayedArticles = data;
          this.loading = false;  // 加载完成
        },
        (error) => {
          console.error('加载所有文章失败', error);
          this.displayedArticles = [];
          this.loading = false;  // 加载完成
        }
      );
      }

  }
}
