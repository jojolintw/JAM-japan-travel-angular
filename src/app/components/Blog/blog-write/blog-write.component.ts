import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HashtagService } from 'src/app/service/Blog/hashtag.service';
import { ArticleService } from 'src/app/service/Blog/article.service';
import { ArticleCreateDTO } from 'src/app/interface/Article/ArticleCreate.interface';
import { Hashtag } from 'src/app/interface/Article/Hashtag.interface';
import { Router } from '@angular/router';



@Component({
  selector: 'app-blog-write',
  templateUrl: './blog-write.component.html',
  styleUrls: ['./blog-write.component.css']
})
export class BlogWriteComponent implements OnInit {

  createArticleForm: FormGroup;  // 正確的初始化，確保它在類別中聲明並初始化
  hashtags: Hashtag[] = [];  // 用來儲存 Hashtags，這樣不需要 id 和 name
  articleContent: string = ''; // 用来保存 Quill 编辑器的内容
  quillConfig = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image']
    ]
  };

  editorContent = '';  // 用于存储编辑器内容

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private hashtagService: HashtagService,
    private router: Router  // 在建構函數中注入 Router
  ) {
    // 確保 createArticleForm 在建構函數中初始化
    this.createArticleForm = this.fb.group({
      articleTitle: ['', Validators.required],       // 文章標題
      articleContent: ['', Validators.required],     // 文章內容
      selectedHashtags: [[]]                          // 用來儲存選中的 Hashtags
    });
  }

  ngOnInit(): void {
    // 獲取所有 Hashtags
    this.hashtagService.getHashtags().subscribe((data: Hashtag[]) => {
      this.hashtags = data;  // 直接儲存回來的字串陣列
    });
  }



  // 提交表單
  onSubmit(): void {
    if (this.createArticleForm.invalid) {
      return;// 如果表單無效，則不提交
    }

    const formValues = this.createArticleForm.value;
    const newArticle: ArticleCreateDTO = {
      memberId: 1, // 假設你會從登錄或其他地方拿到這個 ID
      articleTitle: formValues.articleTitle,
      articleContent: formValues.articleContent,
      hashtagNumbers: formValues.selectedHashtags.map((x:Hashtag)=>x.id) // 直接傳遞所選擇的 Hashtags 名稱
    };

    // 呼叫 ArticleService 的方法來創建新文章
    this.articleService.createArticle(newArticle).subscribe(response => {
      console.log('文章創建成功', response);
      // 在這裡可以做一些處理，如重定向或顯示提示訊息

      // 提示新增文章成功
    alert('新增文章成功！');

// 在創建文章成功後，跳轉到文章列表頁面
this.router.navigate(['/blog-list']);  // 假設要跳轉到文章列表頁面

    });
  }

  // 處理 Hashtags 選擇
  onHashtagChange(hashtag: Hashtag, event: any): void {
    const selectedHashtags = this.createArticleForm.get('selectedHashtags')?.value;

    if (event.target.checked) {
      selectedHashtags.push(hashtag);
    } else {
      const index = selectedHashtags.indexOf(hashtag);
      if (index >= 0) {
        selectedHashtags.splice(index, 1);
      }
    }

    // 更新表單的 selectedHashtags 值
    this.createArticleForm.get('selectedHashtags')?.setValue(selectedHashtags);
  }
  // 點擊按鈕後插入一段文字
  insertText(): void {
    this.editorContent = `青森市是位於日本青森縣的城市和中核市，也是本州最北端的縣廳所在地。青森市地處青森縣的中央位置、津輕地方的東北部，與東津輕郡形成「東青地域」。北邊面向津輕海峽，市中心以青森灣為中心朝青森平原擴散，使市中心地區呈扇狀分布。當地在江戶初期作為港口城市發展，市內以三內丸山遺跡和青森睡魔祭最廣為人知。尤其是在夏季舉辦的青森睡魔祭，每年吸引超過200萬的遊客前往。
青森市是本州和北海道之間的交通要衝，在青森港內設有航行前往函館港的青函渡輪(青函航路)。鐵路方面，新青森站是東北新幹線的終點和北海道新幹線的起點。當地的自然資源也很豐富，東南部的八甲田山及東北部的淺蟲地區，分別位於十和田八幡平國家公園及淺蟲夏泊縣立自然公園的範圍內。市內有相當多的溫泉，包括八甲田山腳下的酸湯和海灣上的淺蟲溫泉。
當地的農業以生產蘋果和黑加侖為主，其中蘋果的產量在日本的市町村排名第三，黑加侖的產量則佔日本全國總產量的70%。由於平館海峽的寬度相當窄，使青森市北邊的陸奧灣較少受到外面海洋的影響，全年約90%的時間波浪高度小於5公分。加上青森灣被津輕半島及夏泊半島所包圍，使灣內的青森港為天然良港之一，在該港的沿海地區有養殖扇貝。`;
    this.createArticleForm.get('articleContent')?.setValue(this.editorContent);  // 更新表單中的值
  }
}
