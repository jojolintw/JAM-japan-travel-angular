import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import{ArticleService} from 'src/service/article-service/article.service';
import { Article } from 'src/app/interface/Product/Article.interface';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent {
  // xxx:Article[];
  constructor(private route: ActivatedRoute, private ArticleService: ArticleService) { }

  ngOnInit(): void {
        this.ArticleService.getArticle().subscribe((data: Article[]) => {
        //  this.xxx=data;
    })
  }
}
