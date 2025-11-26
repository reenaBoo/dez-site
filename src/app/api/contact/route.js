import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    await resend.emails.send({
      from: 'Заявки с сайта <onboarding@resend.dev>',
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
