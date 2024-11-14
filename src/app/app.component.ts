import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { LoginService } from './service/Member/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router) {}

  title = 'JP_Angular';

  editorContent = '';  // 用于存储编辑器内容
  quillConfig = {
    toolbar: [
      ['bold', 'italic', 'underline'],  // 添加加粗、斜体、下划线按钮
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],  // 添加有序列表和无序列表按钮
      ['link', 'image']  // 添加插入链接和图片按钮
    ]
  };

}
