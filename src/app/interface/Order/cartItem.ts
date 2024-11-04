export interface cartItem{
  id:number             //商品ID
  name:string           //商品名稱
  price:number          //商品單價
  quantity:number       //數量
  imagePath:string      //圖片路徑
  type:string           //區分行程與船票
  couponName:string     //優惠券名稱
  discount:number       //折扣
}
