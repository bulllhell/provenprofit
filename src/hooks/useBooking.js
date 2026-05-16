import { useState } from 'react';
import { supabase } from '../lib/supabase';

export function useBooking() {
  const [status,  setStatus]  = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  const submit = async (formData) => {
    const { name, email, phone, service, budget, userMessage, preferredTime } = formData;

    if (!name?.trim() || !email?.trim() || !userMessage?.trim()) {
      setStatus('error');
      setMessage('Please fill in all required fields.');
      return false;
    }
    if (!email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return false;
    }

    setStatus('loading');
    setMessage('');

    try {
      const { error } = await supabase
        .from('booking_requests')
        .insert([{
          name:           name.trim(),
          email:          email.toLowerCase().trim(),
          phone:          phone?.trim() || null,
          service:        service || null,
          budget:         budget || null,
          message:        userMessage.trim(),
          preferred_time: preferredTime || null,
          status:         'new',
          submitted_at:   new Date().toISOString(),
        }]);

      if (error) throw error;

      setStatus('success');
      setMessage("Message sent! We will be in touch within 24 hours.");
      return true;
    } catch (err) {
      console.error('Booking error:', err);
      setStatus('error');
      setMessage('Something went wrong. Please try again or WhatsApp us directly.');
      return false;
    }
  };

  const reset = () => { setStatus('idle'); setMessage(''); };

  return { submit, status, message, reset };
}