import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { forgetPasswordTransfer } from 'src/app/interface/Login/forgetPasswordTransfer';
import { LoginService } from 'src/app/service/Member/login.service';
import { MatDialog } from '@angular/material/dialog';
import { ResetPasswordEmailComponent } from '../reset-password-email/reset-password-email.component';
import { ResetPasswordCompleteComponent } from '../reset-password-complete/reset-password-complete.component';
import Swal from 'sweetalert2';

//我不是機器人相關
declare var grecaptcha: any;

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent {

  constructor(private loginService: LoginService, private router: Router,private dialog: MatDialog ) { }

    //我不是機器人相關
    captchaResponse: string | null = null;
    recaptchaRendered = false;
    //===================================================

  forgetPasswordTransfer: forgetPasswordTransfer =
    {
      email: '',
      password: '',
      passwordconfirm: ''
    }
  errormessage =
    {
      password: '',
      passworcomfirm: ''
    }
    focus()
    {
      this.errormessage.password='';
      this.errormessage.passworcomfirm='';
    }



  resetPassword() {
    this.forgetPasswordTransfer.email = this.loginService.getForgetPasswordEmail();
    //密碼空白驗證
    if (this.forgetPasswordTransfer.password === '') {
      this.errormessage.password = '密碼欄位不可空白';
    }
    //密碼格式驗證
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(this.forgetPasswordTransfer.password)) {
      this.errormessage.password = '密碼為8位數以上且需要包含英文及數字'
      return;
    }
    //確認密碼空白驗證
    if (this.forgetPasswordTransfer.passwordconfirm === '') {
      this.errormessage.passworcomfirm = '確認密碼欄位不可空白';
      return;
    }
    //密碼不一致驗證
    if(this.forgetPasswordTransfer.password != this.forgetPasswordTransfer.passwordconfirm)
      {
        this.errormessage.passworcomfirm = '密碼不一致';
        return;
      }

    //打API
    if (this.captchaResponse)
      {
        this.loginService.ResetPasswordAPI(this.forgetPasswordTransfer).subscribe(data => {
          if(data.result ==='success')
            {
              this.dialog.open(ResetPasswordCompleteComponent);
              this.loginService.removeForgetPasswordEmail();
              this.router.navigate(['**']);
            }
          })
      }
      else
      {
        Swal.fire({
          icon: "error",
          title: "請完成我不是機器人驗證",
          showConfirmButton: false,
        })
      }

  }
    // 初始化 reCAPTCHA
    ngAfterViewChecked(): void {
      if (!this.recaptchaRendered) {
        grecaptcha.render('recaptcha-container', {
          sitekey: '6Le6oHoqAAAAAPL4kjsNmc3Uyd9WIadivdAKzCnR',
          callback: (response: string) => this.onCaptchaResolved(response),
        });
        this.recaptchaRendered = true;
      }
    }
      // 初始化 reCAPTCHA
      ngAfterViewInit(): void {
        grecaptcha.render('recaptcha-container', {
          sitekey: '6Le6oHoqAAAAAPL4kjsNmc3Uyd9WIadivdAKzCnR', // 使用你的 Site Key
          callback: (response: string) => this.onCaptchaResolved(response),
        });
      }
    // 當 reCAPTCHA 被解決後，回調此函數
    onCaptchaResolved(captchaResponse: string) {
      console.log('reCAPTCHA 回應:', captchaResponse);
      this.captchaResponse = captchaResponse;
    }
}
