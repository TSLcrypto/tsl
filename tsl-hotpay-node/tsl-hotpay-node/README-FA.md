# اتصال TSLcrypto.com به HOT Pay با Node.js

این بسته از همان HTML ارسالی ساخته شده و شامل بک‌اند Express، دکمه HOT Pay، ساخت شناسه سفارش، Webhook آزمایشی و صفحه نتیجه است.

## نصب

```powershell
npm install
Copy-Item .env.example .env
```

در فایل `.env` فقط روی سرور این مقادیر را وارد کن:

```env
HOT_PAY_PARTNER_JWT=...
HOT_PAY_WEBHOOK_SECRET=...
```

## اجرا

```powershell
npm start
```

تست:

```text
http://127.0.0.1:3000/health
```

## Webhook URL در HOT Pay

```text
https://tslcrypto.com/api/hotpay/webhook
```

وب‌سرور اصلی باید مسیر `/api/hotpay/` را به Node.js روی `http://127.0.0.1:3000/api/hotpay/` Reverse Proxy کند.

## تست Webhook

پس از عمومی‌شدن URL:

```powershell
npm run test:webhook
```

سپس فایل زیر را بررسی کن:

```text
logs/hotpay-webhooks.log
```

حالت `diagnostic` فقط Webhook را ثبت می‌کند و پرداخت را نهایی نمی‌کند. تا وقتی نام Header یا روش دقیق اعتبارسنجی Secret از Test Webhook مشخص نشده، آن را به `verified` تغییر نده.
