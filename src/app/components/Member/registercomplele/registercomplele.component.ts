import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-registercomplele',
  templateUrl: './registercomplele.component.html',
  styleUrls: ['./registercomplele.component.css']
})
export class RegistercompleleComponent {

  constructor(private dialogRef: MatDialogRef<RegistercompleleComponent>) {}

  closeDialog()
  {
    this.dialogRef.close();
  }




}
