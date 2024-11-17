import { Component, OnInit } from '@angular/core';
import { HashtagService } from 'src/app/service/Blog/hashtag.service';
import { ArticleService } from 'src/app/service/Blog/article.service';
import { Article } from 'src/app/interface/Article/Article.interface';
import { Hashtag } from 'src/app/interface/Article/Hashtag.interface';
import { ActivatedRoute } from '@angular/router';


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


  constructor(private route: ActivatedRoute,
    private ArticleService: ArticleService,
    private hashtagService: HashtagService,

  ) { }

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
        // 处理会员图片路径 (imagePath)
        this.displayedArticles.forEach(article => {
          // 确保前端显示图片路径
          article.imagePath = article.imagePath || ''; // 如果没有图片路径，可以用空字符串作为默认值
          article.memberName = article.memberName || ''; // 如果没有会员名称，可以用空字符串作为默认值
          // 如果有 Base64 图片，确保它们被正确处理
        article.articleImages = article.articleImages || [];  // 如果没有图片，默认为空数组
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
        console.error('载入hashtag失败', error);
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

         // 处理会员图片路径 (imagePath)
         this.displayedArticles.forEach(article => {
          article.imagePath = article.imagePath || ''; // 如果没有图片路径，可以用空字符串作为默认值
          article.memberName = article.memberName || ''; // 如果没有会员名称，可以用空字符串作为默认值
        });
        this.loading = false;
      },
      (error) => {
        console.error('载入相關文章失败', error);
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
