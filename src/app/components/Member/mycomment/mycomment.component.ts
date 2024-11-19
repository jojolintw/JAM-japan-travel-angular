import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { myComment } from 'src/app/interface/Member/myComment';
import { MyareaService } from 'src/app/service/Member/myarea.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mycomment',
  templateUrl: './mycomment.component.html',
  styleUrls: ['./mycomment.component.css']
})
export class MycommentComponent {

  constructor(private dialogRef: MatDialogRef<MycommentComponent>,private myareaService:MyareaService) {}

  rating: number = 0;

  myComment :myComment =
  {
    ordertetailId:0,
    itinerarySystemId:0,
    itineraryName:'',
    commentStar:0,
    commentContent:'',
    commentTime:null
  }

  ngOnInit(): void {
    this.myComment.ordertetailId =parseInt(sessionStorage.getItem('ordertetailId') as string);
    //console.log('ordertetailId',this.myComment.ordertetailId);
    this.myareaService.GetItineraryinfo(this.myComment.ordertetailId).subscribe(data => {
      this.myComment = data;
      this.rating = data.commentStar;

    })

  }

  setRating(star:number): void {
    this.rating=star;
    this.myComment.commentStar = this.rating;
  }
  submit()
  {
    if(this.myComment.commentStar===null)
      {
        Swal.fire({
          icon: "warning",
          title: "請打評分",
          showConfirmButton: false,
          timer: 1500
        })
        return
      }
    this.myComment.commentTime= new Date();

    //新增評論
    this.myareaService.AlterComment(this.myComment).subscribe(data=>
      {
        if(data.result==='success')
          {
            Swal.fire({
              icon: "success",
              title: "儲存成功",
              showConfirmButton: false,
              timer: 2000
            })
          }
      })
    this.dialogRef.close();
  }
  cancel()
  {
    this.dialogRef.close();
  }
  //Demo==================================
  Demo()
  {
    this.myComment.commentContent = '活動太無聊! 差評'
  }
}
