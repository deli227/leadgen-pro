import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
});

const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

serve(async (req) => {
  try {
    const signature = req.headers.get('stripe-signature');
    if (!signature) throw new Error('No Stripe signature found');

    const body = await req.text();
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    if (!webhookSecret) throw new Error('Webhook secret not configured');

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    console.log('Processing webhook event:', event.type);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const customerEmail = session.customer_details?.email;
      if (!customerEmail) throw new Error('No customer email found');

      // Récupérer l'ID du prix pour déterminer le type d'abonnement
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      const priceId = lineItems.data[0]?.price?.id;

      let subscriptionType = 'free';
      if (priceId === 'price_1QV8EyB0B6nBBCbUWZIuAQ8q') {
        subscriptionType = 'pro';
      } else if (priceId === 'price_1QV8FaB0B6nBBCbUFoQrwDwm') {
        subscriptionType = 'enterprise';
      }

      // Mettre à jour le profil utilisateur
      const { data: userData, error: userError } = await supabaseAdmin
        .from('profiles')
        .update({ subscription_type: subscriptionType })
        .eq('email', customerEmail);

      if (userError) throw userError;
      console.log(`Updated subscription for ${customerEmail} to ${subscriptionType}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Webhook error:', error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});