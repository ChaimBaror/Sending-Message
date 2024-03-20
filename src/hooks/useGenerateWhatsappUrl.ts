import { useState } from 'react';

type GenerateWhatsappUrl = (phone: string, text?: string) => void;

type UseGenerateWhatsappUrl = [string, GenerateWhatsappUrl];

export const useGenerateWhatsappUrl = (): UseGenerateWhatsappUrl => {
  const [whatsappUrl, setWhatsappUrl] = useState<string>('');

  const generateWhatsappUrl: GenerateWhatsappUrl = (phone: string, text?: string) => {
    console.log("generateWhatsappUrl phone", phone, "text", text);
    
    const queryParams = new URLSearchParams([
      ['phone', phone],
      ['type', 'phone_number'],
      ['app_absent', '0'],
    ]);
    if (text) {
      queryParams.append('text', text);
    }
    const url = `https://api.whatsapp.com/send/?${queryParams.toString()}`;
    setWhatsappUrl(url);
  };

  return [whatsappUrl, generateWhatsappUrl];
};
