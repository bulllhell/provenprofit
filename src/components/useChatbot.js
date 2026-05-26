import { useState, useCallback } from 'react';

const SYSTEM_PROMPT = `You are the Proven Profit Brand assistant. You are a smart, friendly AI that can answer anything.

HOW TO RESPOND:

1. If someone asks what something IS (a definition, explanation, or general knowledge question like "what is Shopify", "what is FBA", "what is a conversion rate", "what is a cat") — just answer it clearly and helpfully in simple words. No need to mention Proven Profit unless relevant.

2. If someone asks about a SERVICE (anything a business might need — Shopify store, Wix site, web design, logo, ads, SEO, social media, email marketing, dropshipping, print on demand, Wix, Squarespace, Webflow, Amazon FBA setup, TikTok ads, anything) — say that Proven Profit offers it or can help, and tell them to contact us to get started.

3. If someone asks something you genuinely cannot answer or are unsure about — say "I am not sure about that one, but you can contact us at Support@provenprofitbrand.com and the team will help you out."

CONTACT DETAILS (use when directing people to reach out):
- Email: Support@provenprofitbrand.com
- WhatsApp: +234 805 984 6912
- Book a call: Book a Call page on the website

RULES:
- Keep every response to 2 to 3 sentences. Short and clear.
- Never use bullet points or dashes in your responses.
- Be warm, friendly, and sound like a real person.
- Never be negative or say we cannot help with something.`;

const API_URL = 'https://provenprofit-production.up.railway.app/api/chat';

export function useChatbot() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hey! Welcome to Proven Profit. What are you looking to grow today? Your store, your brand, or your online presence?',
    },
  ]);
  const [input,   setInput]   = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = useCallback(async (text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;

    const userMsg     = { role: 'user', content: userText };
    const nextMessages = [...messages, userMsg];

    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          messages: nextMessages.map(m => ({ role: m.role, content: m.content })),
          system:   SYSTEM_PROMPT,
        }),
      });

      const data  = await res.json();
      const reply = data.content || 'Sorry, something went wrong. Please try again.';

      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Something went wrong on my end. Please message us directly on WhatsApp at +234 805 984 6912 and we will help right away.' },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, messages, loading]);

  const clearChat = useCallback(() => {
    setMessages([{
      role: 'assistant',
      content: 'Hey! Welcome to Proven Profit Marketing Agency. What are you looking to grow today? Your store, your brand, or your online presence?',
    }]);
    setInput('');
  }, []);

  return { messages, input, setInput, loading, sendMessage, clearChat };
}