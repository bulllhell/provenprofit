import { useState } from 'react';
import { supabase } from '../lib/supabase';

export function useNewsletter() {
  const [status,  setStatus]  = useState('idle'); // idle | loading | success | error | duplicate
  const [message, setMessage] = useState('');

  const subscribe = async (email) => {
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const { data: existing } = await supabase
        .from('newsletter_subscribers')
        .select('id')
        .eq('email', email.toLowerCase().trim())
        .maybeSingle();

      if (existing) {
        setStatus('duplicate');
        setMessage("You are already subscribed!");
        return;
      }

      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{
          email:         email.toLowerCase().trim(),
          subscribed_at: new Date().toISOString(),
          source:        'footer',
        }]);

      if (error) throw error;

      setStatus('success');
      setMessage("You are in! Welcome to the list.");
    } catch (err) {
      console.error('Newsletter error:', err);
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  const reset = () => { setStatus('idle'); setMessage(''); };

  return { subscribe, status, message, reset };
}