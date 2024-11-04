import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import{ArticleService} from 'src/app/service/Blog/article-service/article.service';
import { Article } from 'src/app/interface/Article/Article.interface';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit{

  // article:Article[]=[];
  displayedArticles: Article[] = [];


  constructor(private route: ActivatedRoute, private ArticleService: ArticleService) { }

  ngOnInit(): void {
    this.ArticleService.getArticles().subscribe((data: Article[]) => {
      console.log('API 返回的資料:', data); // 打印整個返回的資料
      this.displayedArticles = data;

      // 迭代每篇文章，打印發文時間和最新修改時間
      this.displayedArticles.forEach(article => {
        article.launchTime = new Date(article.launchTime);
        article.lastUpdateTime = new Date(article.lastUpdateTime);
        console.log('發文日期:', article.launchTime);
        console.log('最新修改日期:', article.lastUpdateTime);
      });
    }, (error) => {
      console.error('Error fetching articles', error);
    });
  }

  clickTest(){
    alert('here');
  }
}
