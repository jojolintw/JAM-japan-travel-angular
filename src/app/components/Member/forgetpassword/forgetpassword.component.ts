import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { LoginService } from 'src/app/service/Member/login.service';
import { LoginTransfer } from 'src/app/interface/Login/loginTransfer';
import { MatDialog } from '@angular/material/dialog';
import { ResetPasswordEmailComponent } from '../reset-password-email/reset-password-email.component';
import { forgetPasswordTransfer } from 'src/app/interface/Login/forgetPasswordTransfer';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent {

  forgetPasswordTransfer: forgetPasswordTransfer =
    {
      email: '',
      password: '',
      passwordconfirm:'',
    }
  errormessage = '';

  constructor(private loginService: LoginService, private router: Router,private dialog: MatDialog) { }

  focus()
  {
    this.errormessage ='';
  }




  resetpassword() {
    //空白驗證
    if (this.forgetPasswordTransfer.email === '') {
      this.errormessage = 'Email不可空白';
      return;
    }
    //Email格式驗證
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(this.forgetPasswordTransfer.email)) {
      this.errormessage = '請輸入正確的Email格式'
      return;
    }
    //呼叫忘記密碼寄信的API
    this.loginService.ForgetPasswortEmail(this.forgetPasswordTransfer).subscribe(data => {
      if (data.result === 'fail') {
        this.errormessage = data.message
      }
      if (data.result === 'success') {
        this.loginService.saveForgetPasswordEmail(this.forgetPasswordTransfer.email)
        this.dialog.open(ResetPasswordEmailComponent);
        this.router.navigate(['**'])
      }
    })
  }
}
