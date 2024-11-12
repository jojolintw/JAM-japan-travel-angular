import { Component } from '@angular/core';
import { Area } from 'src/app/interface/Member/Area';
import { MyfavoriteItilities } from 'src/app/interface/Member/MyfavoriteItilities';
import { MyareaService } from 'src/app/service/Member/myarea.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mycollection',
  templateUrl: './mycollection.component.html',
  styleUrls: ['./mycollection.component.css']
})
export class MycollectionComponent {

  constructor(private myareaService: MyareaService) { }

  areas:Area[]=[];
  myfavoriteItilities: MyfavoriteItilities[] = [];
  isActive =true;
  selectedAreaId=0;

  ngOnInit(): void {
    this.intothispage();
  }
  //
  intothispage()
  {
    //取得所有日本地區資料==================================================================
    this.myareaService.GetAllArea().subscribe(data=>{
      this.areas = data;
    })
    //取得所有我的最愛資料==================================================================
    this.myareaService.GetAllMyfavorites().subscribe(data => {
      this.myfavoriteItilities = data;
      console.log(this.myfavoriteItilities);
    })
  }
  //移除我的最愛
  removemycollection(itinerarySystemId: number)
  {
    this.myareaService.Removemyfavorite(itinerarySystemId).subscribe(data =>{
      if(data.result==='success')
        {
          Swal.fire({
            icon: "success",
            title: "從我的最愛中移除",
            showConfirmButton: false,
            timer: 1000
          })
          this.intothispage();
        }
    })
  }
  selectArea(event: any)
  {
    this.selectedAreaId = event.target.value;
    if(this.selectedAreaId==0)
      {
        this.myareaService.GetAllMyfavorites().subscribe(data => {
          this.myfavoriteItilities = data;
        })
      }
      else
      {
        this.myareaService.GetAreaMyfavorites(this.selectedAreaId).subscribe(data =>{
          this.myfavoriteItilities = data;
        })
      }

  }


}
