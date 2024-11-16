export const environment = {
  production: false,
  // 您的後端 API URL (用於處理 LINE Pay 回調)
  apiUrl: 'https://localhost:7100',

  linePay: {
    channelId: '2006530351',
    channelSecret: '96f3c66527b68f45c7dee92962c58855',
    // LINE Pay API 相關端點
    apiUrl: 'https://sandbox-api-pay.line.me',
    // 支付請求端點
    paymentRequestUrl: 'https://sandbox-api-pay.line.me/v3/payments/request',
    // 支付確認端點
    paymentConfirmUrl: 'https://sandbox-api-pay.line.me/v3/payments/confirm',
    // 支付取消端點
    paymentCancelUrl: 'https://sandbox-api-pay.line.me/v3/payments/cancel',
    // 回調 URLs (需要改為您的實際網址)
    confirmUrl: 'http://localhost:4200/order/confirm',
    cancelUrl: 'http://localhost:4200/order/cancel'
  }
}
