import { Component } from '@angular/core';
import { MyfavoriteItilities } from 'src/app/interface/Member/MyfavoriteItilities';
import { MyareaService } from 'src/app/service/Member/myarea.service';

@Component({
  selector: 'app-mycollection',
  templateUrl: './mycollection.component.html',
  styleUrls: ['./mycollection.component.css']
})
export class MycollectionComponent {

constructor(private myareaService:MyareaService){}

myfavoriteItilities:MyfavoriteItilities[]=[];



ngOnInit(): void {
  this.myareaService.GetAllMyfavorites().subscribe(data =>{
    console.log('我的最愛',data);
    this.myfavoriteItilities=data;
    console.log('我的最愛2',this.myfavoriteItilities);
  })

}




}
