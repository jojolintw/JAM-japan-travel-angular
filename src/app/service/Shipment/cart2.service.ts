import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Cart2Service {
  private selectedSchedule: any = null;
  private selectedSeats: number = 0;

  // 設定選擇的行程
  setSelectedSchedule(schedule: any) {
    this.selectedSchedule = schedule;
  }

  // 取得選擇的行程
  getSelectedSchedule() {
    return this.selectedSchedule;
  }

  // 設定選擇的人數
  setSelectedSeats(seats: number) {
    this.selectedSeats = seats;
  }

  // 取得選擇的人數
  getSelectedSeats() {
    return this.selectedSeats;
  }
  clearCart() {
    this.selectedSchedule = null;
    this.selectedSeats = 0;
  }

  // 獲取購物車的項目
  getItems() {
    if (this.selectedSchedule) {
      return [{ 
        schedule: this.selectedSchedule, 
        seats: this.selectedSeats 
      }];
    } else {
      return []; // 如果購物車為空，返回空陣列
    }
  }
}
