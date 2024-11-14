import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HashtagService } from 'src/app/service/Blog/hashtag.service';
import { ArticleService } from 'src/app/service/Blog/article.service';
import { ArticleCreateDTO } from 'src/app/interface/Article/ArticleCreate.interface';
import { Hashtag } from 'src/app/interface/Article/Hashtag.interface';


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
    private hashtagService: HashtagService
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
      return;
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
}
