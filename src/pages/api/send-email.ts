import { Resend } from "resend";

export const prerender = false;
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST({ request }: { request: Request }) {
  try {
    if (
      !process.env.RESEND_API_KEY ||
      process.env.RESEND_API_KEY === "dummy-key-for-build"
    ) {
      return new Response(
        JSON.stringify({ error: "Service d'email non configuré" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Tous les champs sont requis" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: "Adresse email invalide" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const mailTo = process.env.CONTACT_EMAIL;
    if (!mailTo) {
      return new Response(
        JSON.stringify({ error: "Adresse email non configurée" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Formulaire de contact <contact@feeautour.fr>",
      to: mailTo,
      subject: `Nouveau message de ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Nouveau message de contact</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nom:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>
          <p style="color: #666; font-size: 14px;">
            Ce message a été envoyé depuis le formulaire de contact de votre site web.
          </p>
        </div>
      `,
      replyTo: email,
    });

    if (error) {
      console.error("Erreur Resend:", error);
      return new Response(
        JSON.stringify({ error: "Erreur lors de l'envoi de l'email" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Email envoyé avec succès",
        id: data?.id,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Erreur serveur:", error);
    return new Response(
      JSON.stringify({ error: "Erreur interne du serveur" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
