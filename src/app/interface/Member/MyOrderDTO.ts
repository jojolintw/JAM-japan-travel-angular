export interface MyOrderDTO
{
  orderId:number;
  orderNumber: string;
  memberId: number;
  memberName: string;
  orderStatusId:number;
  orderStatus:string;
  paymentMehtodId : number;
  paymentMethod: string;
  totalAmount: number;
  orderTime:string;
}
