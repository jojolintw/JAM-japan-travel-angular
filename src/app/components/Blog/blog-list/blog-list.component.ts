import { Component, OnInit } from '@angular/core';

import { HashtagService } from 'src/app/service/Blog/hashtag.service';
import { ArticleService } from 'src/app/service/Blog/article.service';
import { Article } from 'src/app/interface/Article/Article.interface';
import { Hashtag } from 'src/app/interface/Article/Hashtag.interface';
import { ActivatedRoute } from '@angular/router';
import { LocalstorageService } from 'src/app/service/Order/localstorage.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  displayedArticles: Article[] = [];
  keyword: string = '';  // 存储搜索关键词
  loading: boolean = false;  // 用于指示正在加载数据
  hashtags: Hashtag[] = [];  // 存储标签列表
  memberName: string = '';
  imagePath?: string = '';

  constructor(private route: ActivatedRoute,
    private ArticleService: ArticleService,
    private hashtagService: HashtagService,
    private localStorageService: LocalstorageService
  ) { }

  ngOnInit(): void {
    // 加载所有文章
    this.loadArticles();

    // 加载标签列表
    this.loadHashtags();


    this.localStorageService.getMemberInfo().subscribe(response => {
      if (response.result === 'success') {
        // 假設你希望使用 MemberName 和 ImagePath
        this.memberName = response.loginmember.chineseName;
        this.imagePath = response.loginmember.imageUrl;


        // 可以將這些資料儲存到 Angular 服務或是直接顯示在 UI 上
      } else {
        console.error('Login failed or no login data available');
      }
    });
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
  loadArticlesByHashtag(hashtag: Hashtag): void {
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



}
