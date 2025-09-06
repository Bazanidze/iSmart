import nodemailer from "nodemailer";

async function main() {
  const transporter = nodemailer.createTransport({
    host: "mail.ismart.org",
    port: 465,
    secure: true,
    auth: {
      user: "noreply@ismart.org",
      pass: "Fyb872trf1F821h",
    },
    tls: {
      rejectUnauthorized: false, // пропуск проверки сертификата
      ciphers: "SSLv3",
    },
  });

  const info = await transporter.sendMail({
    from: '"iSmart" <noreply@ismart.org>',
    to: "evdokimova537@yandex.ru, sveez@yandex.ru, bazanov.91@inbox.ru, vpozitive@mail.ru",
    subject: "Allure AutoTest Report",
    text: "See attached report",
    attachments: [{ path: "allure-report.zip" }],
  });

  console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);
