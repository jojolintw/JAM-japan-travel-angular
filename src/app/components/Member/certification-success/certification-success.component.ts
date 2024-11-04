import { Component } from '@angular/core';
import { LoginService } from 'src/app/service/Member/login.service';

@Component({
  selector: 'app-certification-success',
  templateUrl: './certification-success.component.html',
  styleUrls: ['./certification-success.component.css']
})
export class CertificationSuccessComponent {
 constructor(private loginService:LoginService){}

 ngOnInit(): void {
  this.loginService.CertificationSuccess().subscribe(data =>
    {
      console.log(data);
    })
 }


}
