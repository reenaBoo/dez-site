import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, message } = body;

    if (!name || !phone || !message) {
      return Response.json(
        { success: false, error: 'Все поля обязательны' },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL,
      subject: `Новая заявка: ${name}`,
      text: `Имя: ${name}\nТелефон: ${phone}\nСообщение: ${message}`,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Ошибка:', error);
    return Response.json(
      { success: false, error: 'Ошибка отправки' },
      { status: 500 },
    );
  }
}
