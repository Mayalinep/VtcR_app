import { NextRequest, NextResponse } from 'next/server';

const SUBJECT_LABELS: Record<string, string> = {
  reservation: 'Question sur une réservation',
  tarifs: 'Demande de tarifs',
  service: 'Question sur le service',
  partenariat: 'Partenariat / Entreprise',
  autre: 'Autre',
};

interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactPayload = await request.json();

    const name = data.name?.trim() ?? '';
    const email = data.email?.trim() ?? '';
    const phone = data.phone?.trim() ?? '';
    const subject = data.subject?.trim() ?? '';
    const message = data.message?.trim() ?? '';

    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 });
    }

    if (message.length < 10) {
      return NextResponse.json({ error: 'Message trop court' }, { status: 400 });
    }

    if (!SUBJECT_LABELS[subject]) {
      return NextResponse.json({ error: 'Sujet invalide' }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const rachelEmail = process.env.RACHEL_EMAIL;

    if (!resendApiKey || !rachelEmail || resendApiKey === 'YOUR_RESEND_API_KEY_HERE') {
      console.error('❌ Contact: Resend non configuré');
      return NextResponse.json(
        { error: 'Service d’envoi indisponible. Réessayez plus tard ou appelez Rachel.' },
        { status: 503 }
      );
    }

    const subjectLabel = SUBJECT_LABELS[subject];

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'VTC Rachel <noreply@rach-services.com>',
        to: [rachelEmail],
        reply_to: email,
        subject: `📬 Contact site : ${subjectLabel} — ${name}`,
        text: `
Nouveau message depuis le formulaire Contact

Nom : ${name}
Email : ${email}
Téléphone : ${phone}
Sujet : ${subjectLabel}

Message :
${message}
        `.trim(),
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0F4C3A;">📬 Nouveau message — Contact</h2>
            <div style="background: #F5F5F5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
              <p><strong>Email :</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
              <p><strong>Téléphone :</strong> <a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></p>
              <p><strong>Sujet :</strong> ${escapeHtml(subjectLabel)}</p>
            </div>
            <div style="background: #F5F5F5; padding: 20px; border-radius: 8px; margin: 20px 0; white-space: pre-wrap;">
              ${escapeHtml(message)}
            </div>
            <p style="color: #666; font-size: 12px;">Envoyé depuis le formulaire Contact du site</p>
          </div>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const errorBody = await emailResponse.text();
      console.error('❌ Contact Resend error:', errorBody);
      return NextResponse.json({ error: 'Échec de l’envoi du message' }, { status: 502 });
    }

    const result = await emailResponse.json();
    console.log('✅ Contact email envoyé', result);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Contact API error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
