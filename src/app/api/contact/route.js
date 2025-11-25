export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, message } = body;

    console.log('📧 Заявка:', { name, phone, message });

    if (!name || !phone || !message) {
      return Response.json(
        { success: false, error: 'Все поля обязательны' },
        { status: 400 },
      );
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    return Response.json({ success: true });
  } catch (error) {
    console.error('Ошибка:', error);
    return Response.json(
      { success: false, error: 'Ошибка обработки' },
      { status: 500 },
    );
  }
}
