import { useState, useCallback, useRef } from 'react';

const SYSTEM_PROMPT = `You are the Proven Profit Brand assistant. You are a friendly, knowledgeable sales helper on the Proven Profit website. You help visitors understand services, recommend the right package, and guide them toward booking a free call or messaging on WhatsApp.

ABOUT PROVEN PROFIT:
Proven Profit Brand is a digital agency that builds high-converting websites, runs paid ads, manages social media, handles SEO, builds brand identities, and sets up email marketing flows for eCommerce and service businesses worldwide.

SERVICES AND PRICES:
1. eCommerce Store Design (Shopify and WooCommerce)
   Launchpad: $495 one-time, 5 pages, 15 products, 5 to 7 days
   Accelerator: $789 one-time, 7 pages, 30 products, 7 to 10 days (most popular)
   Dominance: From $1,200 one-time, fully bespoke, 14 to 21 days

2. Branding (Logo and Identity)
   Start: $259 one-time, logo design, 5 to 7 days
   Standard: $599 one-time, full brand identity, 10 to 14 days (most popular)
   Pro: $1,199 one-time, complete brand system, 18 to 25 days

3. Web Design (Custom websites)
   Start: $399 one-time, 5 pages, 5 to 7 days
   Standard: $899 one-time, 8 pages with CMS, 10 to 14 days (most popular)
   Pro: $1,499 one-time, unlimited pages, 18 to 25 days

4. Social Media Management and Meta Ads
   Starter: $299 per month, 8 posts, 1 platform
   Growth: $599 per month, 16 posts, 2 platforms, Meta Ads (most popular)
   Pro: $999 per month, 24 posts, 3 platforms, full ad management

5. Google Ads and Google My Business
   Start: $99 per month management (ad budget paid separately to Google)
   Standard: $299 per month management (most popular)
   Pro: $599 per month management

6. SEO
   Custom pricing based on scope. Book a call for a free audit.

7. Email Marketing (Klaviyo and Mailchimp)
   Starter: $249 one-time setup
   Growth: $499 one-time setup (most popular)
   Pro: $899 one-time setup

IMPORTANT RULES:
- Keep responses SHORT. Maximum 3 to 4 sentences per reply.
- Never use bullet points or long lists. Speak naturally like a friendly human.
- Always end with a soft push toward booking a call or WhatsApp.
- If someone asks about pricing, give the range and recommend the most popular option.
- If someone is unsure, ask ONE qualifying question about their business type or goal.
- Never make up services or prices not listed above.
- Be warm, confident, and direct. Not salesy or pushy.
- Do NOT use dashes or hyphens in your responses.
- WhatsApp: +234 805 984 6912
- Book a call: /book-a-call on the website`;

const API_URL = import.meta.env.VITE_CHAT_API_URL || '/api/chat';

export function useChatbot() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hey! Welcome to Proven Profit. What are you looking to grow today? Your store, your brand, or your online presence?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = useCallback(async (text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;

    const userMsg = { role: 'user', content: userText };
    const nextMessages = [...messages, userMsg];

    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const apiMessages = nextMessages.map(m => ({ role: m.role, content: m.content }));

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages, system: SYSTEM_PROMPT }),
      });

      const data = await res.json();
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
      content: 'Hey! Welcome to Proven Profit. What are you looking to grow today? Your store, your brand, or your online presence?',
    }]);
    setInput('');
  }, []);

  return { messages, input, setInput, loading, sendMessage, clearChat };
}