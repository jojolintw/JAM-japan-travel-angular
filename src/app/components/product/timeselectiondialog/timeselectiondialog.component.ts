import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-time-selection-dialog',
  template: `
    <h2 mat-dialog-title>選擇時間 - {{data.date | date:'yyyy/MM/dd'}}</h2>
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
  `]
})
export class TimeSelectionDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TimeSelectionDialogComponent>
  ) {}

  isTimeAvailable(time: string): boolean {
    // 檢查該時間段是否有庫存
    const tour = this.data.tours.find((t: { date: { time: string; date: { toDateString: () => any; }; }[]; }) =>
      t.date.some((d: { time: string; date: { toDateString: () => any; }; }) =>
        d.time === time &&
        d.date.toDateString() === this.data.date.toDateString()
      )
    );
    return tour?.stock > 0;
  }

  selectTime(time: string): void {
    this.dialogRef.close({ time });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
