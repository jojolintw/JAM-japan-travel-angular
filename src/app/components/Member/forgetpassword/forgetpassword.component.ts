import { Component } from '@angular/core';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent {

  useremail='';
  errormessage='';

  resetpassword()
  {
    //空白驗證
    if(this.useremail ==='')
      {
        this.errormessage='Email不可空白';
        return;
      }
    //Email格式驗證
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(this.useremail))
      {
        this.errormessage ='請輸入正確的Email格式'
        return;
      }
  }
}
