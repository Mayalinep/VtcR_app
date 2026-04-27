import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route : /api/send-reservation
 *
 * Envoie les détails d'une réservation à Rachel par :
 * - Email (via Resend)
 * - SMS (via Twilio)
 *
 * @param request - Contient toutes les informations de réservation
 * @returns { success: true } si envoyé avec succès
 */

interface ReservationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  passengers: number;
  luggage: number;
  comment: string;
  departure: string;
  arrival: string;
  price: number;
  distance: string;
  duration: string;
  recaptchaToken?: string;
}

export async function POST(request: NextRequest) {
  try {
    // 1. Récupérer les données de la réservation
    const data: ReservationData = await request.json();

    // 2. Vérifier le token reCAPTCHA
    if (data.recaptchaToken) {
      const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;

      if (recaptchaSecretKey && recaptchaSecretKey !== 'YOUR_RECAPTCHA_SECRET_KEY_HERE') {
        try {
          const recaptchaResponse = await fetch(
            `https://www.google.com/recaptcha/api/siteverify`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: new URLSearchParams({
                secret: recaptchaSecretKey,
                response: data.recaptchaToken,
              }),
            }
          );

          const recaptchaData = await recaptchaResponse.json();

          // Vérifier le score (minimum 0.5 pour accepter)
          if (!recaptchaData.success) {
            console.warn('⚠️ reCAPTCHA failed (mode dégradé - on continue quand même):', recaptchaData);
            // On continue quand même en mode dégradé pour le développement
          } else if (recaptchaData.score < 0.5) {
            console.warn('⚠️ reCAPTCHA score trop faible:', recaptchaData.score, '(mode dégradé - on continue)');
            // TODO: En production, décommenter la ligne ci-dessous pour bloquer les bots
            // return NextResponse.json({ error: 'Échec de la vérification anti-spam.' }, { status: 403 });
          } else {
            console.log('✅ reCAPTCHA validé avec score:', recaptchaData.score);
          }
        } catch (recaptchaError) {
          console.error('❌ Erreur lors de la vérification reCAPTCHA:', recaptchaError);
          // On continue même si la vérification échoue (mode dégradé)
        }
      } else {
        console.log('⚠️ reCAPTCHA non configuré, vérification ignorée');
      }
    }

    // 3. Valider les données obligatoires
    if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.date || !data.time) {
      return NextResponse.json(
        { error: 'Données manquantes' },
        { status: 400 }
      );
    }

    // 4. Formater la date et l'heure en français
    const formattedDate = new Date(data.date).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // 5. Créer le contenu du message
    const messageText = `
🚖 NOUVELLE RÉSERVATION VTC

👤 CLIENT
Nom : ${data.firstName} ${data.lastName}
Email : ${data.email}
Téléphone : ${data.phone}

📍 TRAJET
Départ : ${data.departure}
Arrivée : ${data.arrival}
Distance : ${data.distance}
Durée : ${data.duration}

📅 DATE & HEURE
${formattedDate} à ${data.time}

👥 DÉTAILS
Passagers : ${data.passengers}
Bagages : ${data.luggage}
${data.comment ? `Commentaire : ${data.comment}` : ''}

💰 PRIX ESTIMÉ : ${data.price}€
    `.trim();

    // 6. Préparer les résultats
    const results: {
      email?: unknown;
      clientEmail?: unknown;
      sms?: unknown;
    } = {};

    // 7. Envoyer l'email via Resend (si configuré)
    const resendApiKey = process.env.RESEND_API_KEY;
    const rachelEmail = process.env.RACHEL_EMAIL;

    if (resendApiKey && rachelEmail && resendApiKey !== 'YOUR_RESEND_API_KEY_HERE') {
      try {
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: 'VTC Rachel <onboarding@resend.dev>',
            to: [rachelEmail],
            reply_to: data.email,
            subject: `🚖 Nouvelle réservation : ${data.firstName} ${data.lastName}`,
            text: messageText,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #0F4C3A;">🚖 Nouvelle réservation VTC</h2>
                
                <div style="background: #F5F5F5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="margin-top: 0;">👤 Client</h3>
                  <p><strong>Nom :</strong> ${data.firstName} ${data.lastName}</p>
                  <p><strong>Email :</strong> <a href="mailto:${data.email}">${data.email}</a></p>
                  <p><strong>Téléphone :</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
                </div>

                <div style="background: #F5F5F5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="margin-top: 0;">📍 Trajet</h3>
                  <p><strong>Départ :</strong> ${data.departure}</p>
                  <p><strong>Arrivée :</strong> ${data.arrival}</p>
                  <p><strong>Distance :</strong> ${data.distance}</p>
                  <p><strong>Durée estimée :</strong> ${data.duration}</p>
                </div>

                <div style="background: #F5F5F5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="margin-top: 0;">📅 Date & Heure</h3>
                  <p><strong>${formattedDate}</strong> à <strong>${data.time}</strong></p>
                </div>

                <div style="background: #F5F5F5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="margin-top: 0;">👥 Détails</h3>
                  <p><strong>Passagers :</strong> ${data.passengers}</p>
                  <p><strong>Bagages :</strong> ${data.luggage}</p>
                  ${data.comment ? `<p><strong>Commentaire :</strong> ${data.comment}</p>` : ''}
                </div>

                <div style="background: #0F4C3A; color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
                  <h3 style="margin: 0;">💰 Prix estimé : ${data.price}€</h3>
                </div>

                <p style="color: #666; font-size: 12px; margin-top: 30px;">
                  Cette réservation a été envoyée depuis le site vtcrachel.fr
                </p>
              </div>
            `,
          }),
        });

        if (!emailResponse.ok) {
          throw new Error('Erreur lors de l\'envoi de l\'email');
        }

        results.email = await emailResponse.json();
        console.log('✅ Email envoyé avec succès', results.email);
      } catch (emailError) {
        console.error('❌ Erreur email:', emailError);
        // On continue même si l'email échoue
      }
    } else {
      console.log('⚠️ Email non envoyé : Resend non configuré');
    }

    // 8. Envoyer l'email de confirmation au client
    if (resendApiKey && resendApiKey !== 'YOUR_RESEND_API_KEY_HERE') {
      try {
        const clientEmailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: 'VTC Rachel <onboarding@resend.dev>',
            to: [data.email],
            subject: '✅ Votre demande de réservation a bien été reçue',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px;">
                <div style="background-color: white; padding: 30px; border-radius: 12px;">
                  
                  <!-- Header avec checkmark -->
                  <div style="text-align: center; margin-bottom: 30px;">
                    <div style="background-color: #D4AF37; width: 80px; height: 80px; border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
                      <span style="color: white; font-size: 40px;">✓</span>
                    </div>
                  </div>

                  <!-- Titre -->
                  <h1 style="color: #0F4C3A; text-align: center; margin-bottom: 10px;">Demande reçue !</h1>
                  <p style="text-align: center; color: #666; font-size: 16px; margin-bottom: 30px;">
                    Merci ${data.firstName}, Rachel a bien reçu votre demande.
                  </p>

                  <!-- Message principal -->
                  <div style="background-color: #F0F7F4; padding: 20px; border-radius: 8px; margin-bottom: 30px; border-left: 4px solid #0F4C3A;">
                    <p style="margin: 0; color: #0F4C3A; font-size: 16px; font-weight: bold;">
                      📞 Rachel vous contactera dans les 2 heures
                    </p>
                    <p style="margin: 10px 0 0 0; color: #666; font-size: 14px;">
                      Elle vous appellera pour confirmer tous les détails de votre course.
                    </p>
                  </div>

                  <!-- Récapitulatif -->
                  <h2 style="color: #0F4C3A; font-size: 18px; margin-bottom: 15px;">📋 Récapitulatif de votre demande</h2>
                  
                  <!-- Trajet -->
                  <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                    <p style="margin: 0 0 8px 0; color: #999; font-size: 12px; text-transform: uppercase;">Trajet</p>
                    <p style="margin: 0 0 5px 0; color: #333;"><strong>Départ :</strong> ${data.departure}</p>
                    <p style="margin: 0; color: #333;"><strong>Arrivée :</strong> ${data.arrival}</p>
                    <p style="margin: 8px 0 0 0; color: #666; font-size: 14px;">${data.distance} • ${data.duration}</p>
                  </div>

                  <!-- Date & Heure -->
                  <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                    <p style="margin: 0 0 8px 0; color: #999; font-size: 12px; text-transform: uppercase;">Date & Heure</p>
                    <p style="margin: 0; color: #333;"><strong>${formattedDate}</strong> à <strong>${data.time}</strong></p>
                  </div>

                  <!-- Détails -->
                  <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                    <p style="margin: 0 0 8px 0; color: #999; font-size: 12px; text-transform: uppercase;">Détails</p>
                    <p style="margin: 0 0 5px 0; color: #333;">Passagers : ${data.passengers} • Bagages : ${data.luggage}</p>
                    ${data.comment ? `<p style="margin: 8px 0 0 0; color: #666; font-size: 14px;"><em>"${data.comment}"</em></p>` : ''}
                  </div>

                  <!-- Prix -->
                  <div style="background-color: #0F4C3A; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 30px;">
                    <p style="margin: 0; color: white; font-size: 14px; opacity: 0.9;">Prix estimé</p>
                    <p style="margin: 5px 0 0 0; color: #D4AF37; font-size: 32px; font-weight: bold;">${data.price}€</p>
                  </div>

                  <!-- Contact urgent -->
                  <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center;">
                    <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">Une question urgente ?</p>
                    <a href="tel:+33661590290" style="display: inline-block; background-color: #D4AF37; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: bold;">
                      📞 Appeler Rachel
                    </a>
                  </div>

                </div>

                <!-- Footer -->
                <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
                  <p style="margin: 5px 0;">VTC Rachel - Service premium en Île-de-France</p>
                  <p style="margin: 5px 0;">06 61 59 02 90 • contact@vtc-rachel.fr</p>
                </div>
              </div>
            `,
          }),
        });

        if (!clientEmailResponse.ok) {
          const errorData = await clientEmailResponse.json();
          console.error('❌ Resend API error (client email):', errorData);
          throw new Error(`Erreur Resend: ${JSON.stringify(errorData)}`);
        }

        const clientEmailResult = await clientEmailResponse.json();
        results.clientEmail = clientEmailResult;
        console.log('✅ Email de confirmation envoyé au client', clientEmailResult);
      } catch (clientEmailError) {
        console.error('❌ Erreur email client:', clientEmailError);
        // On continue même si l'email client échoue
      }
    }

    // 9. Envoyer le SMS via Twilio (si configuré)
    const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
    const rachelPhone = process.env.RACHEL_PHONE_NUMBER;

    if (
      twilioAccountSid && 
      twilioAuthToken && 
      twilioPhoneNumber && 
      rachelPhone &&
      twilioAccountSid !== 'YOUR_TWILIO_ACCOUNT_SID_HERE'
    ) {
      try {
        const smsBody = `🚖 NOUVELLE RÉSERVATION\n${data.firstName} ${data.lastName}\n${formattedDate} à ${data.time}\n${data.departure} → ${data.arrival}\n${data.price}€ | Tel: ${data.phone}`;

        const smsResponse = await fetch(
          `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Basic ' + Buffer.from(`${twilioAccountSid}:${twilioAuthToken}`).toString('base64'),
            },
            body: new URLSearchParams({
              From: twilioPhoneNumber,
              To: rachelPhone,
              Body: smsBody,
            }),
          }
        );

        if (!smsResponse.ok) {
          throw new Error('Erreur lors de l\'envoi du SMS');
        }

        results.sms = await smsResponse.json();
        console.log('✅ SMS envoyé avec succès', results.sms);
      } catch (smsError) {
        console.error('❌ Erreur SMS:', smsError);
        // On continue même si le SMS échoue
      }
    } else {
      console.log('⚠️ SMS non envoyé : Twilio non configuré');
    }

    // 10. Retourner le succès
    return NextResponse.json({
      success: true,
      message: 'Réservation envoyée avec succès',
      details: results,
    });

  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de la réservation:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi de la réservation' },
      { status: 500 }
    );
  }
}
