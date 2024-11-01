import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-time-selection-dialog',
  template: `
    <h2 mat-dialog-title>選擇時間 - {{data.DepartureDate | date:'yyyy/MM/dd'}}</h2>
    <mat-dialog-content>
      <div class="time-slots">
        <div *ngFor="let time of data.times" class="time-slot">
          <button mat-button
                  [disabled]="!isTimeAvailable(time)"
                  (click)="selectTime(time)">
            {{time}}
            <span class="stock-status">
              {{isTimeAvailable(time) ? '可預約' : '已滿'}}
            </span>
          </button>
        </div>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onClose()">關閉</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .time-slots {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .time-slot button {
      width: 100%;
      text-align: left;
      padding: 10px;
    }
    .stock-status {
      float: right;
      font-size: 12px;
      color: #666;
    }
  `],
  providers: [DatePipe]
})
export class TimeSelectionDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TimeSelectionDialogComponent>,
    private datePipe: DatePipe
  ) {}

  isTimeAvailable(time: string): boolean {
    const tour = this.data.tours.find((t: { DepartureDate: string }) =>
      t.DepartureDate === this.formatDateTime(this.data.DepartureDate, time)
    );
    return tour?.stock > 0;
  }

  selectTime(time: string): void {
    const formattedDateTime = this.formatDateTime(this.data.DepartureDate, time);
    this.dialogRef.close({ DepartureDate: formattedDateTime });
  }

  private formatDateTime(date: string, time: string): string {
    const dateObj = new Date(date);
    const [hours, minutes] = time.split(':');
    dateObj.setHours(parseInt(hours), parseInt(minutes));
    return this.datePipe.transform(dateObj, 'yyyy-MM-dd HH:mm') || '';
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
