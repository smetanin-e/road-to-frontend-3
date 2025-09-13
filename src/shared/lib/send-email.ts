'use server';
import { Resend } from 'resend';
import React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(to: string, subject: string, template: React.ReactNode) {
  const { data, error } = await resend.emails.send({
    from: 'NEXT-BOOKS <next-books@esmet.store>',
    to,
    subject,
    react: template,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
//from = 'NEXT-BOOKS <next-books@esmet.store>', // дефолтный "от кого"
