export const environment = {
  production: true,
  // 生產環境的配置
  apiUrl: 'https://localhost:7100',

  linePay:{
    channelId: 'YOUR_PRODUCTION_CHANNEL_ID',
    channelSecret: 'YOUR_PRODUCTION_CHANNEL_SECRET',
    apiUrl: 'https://api-pay.line.me',
    paymentRequestUrl:'https://api-pay.line.me/v3/payments/request',
    paymentConfirmUrl:'https://api-pay.line.me/v3/payments/confirm',
    paymentCancelUrl: 'https://api-pay.line.me/v3/payments/cancel',
    confirmUrl: 'YOUR_PRODUTION_CONFIRM_URL',
    cancelUrl: 'YOUR_PRODUCTION_CANCEL_URL'
  }
};
