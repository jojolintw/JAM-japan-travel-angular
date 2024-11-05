import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reset-password-email',
  templateUrl: './reset-password-email.component.html',
  styleUrls: ['./reset-password-email.component.css']
})
export class ResetPasswordEmailComponent {


  constructor(private dialogRef: MatDialogRef<ResetPasswordEmailComponent>) {}

  closeDialog()
  {
    this.dialogRef.close();
  }
}
