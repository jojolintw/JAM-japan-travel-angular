import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reset-password-complete',
  templateUrl: './reset-password-complete.component.html',
  styleUrls: ['./reset-password-complete.component.css']
})
export class ResetPasswordCompleteComponent {


  constructor(private dialogRef: MatDialogRef<ResetPasswordCompleteComponent>) {}

  closeDialog()
  {
    this.dialogRef.close();
  }
}
