/* eslint-disable max-lines-per-function */
//@ts-nocheck: unable to resolve tsc compatibility with deno

import { createClient } from 'supabase';
import { Webhook } from 'svix';

Deno.serve(async (req: Request) => {
  // Retrieve webhook secret and service role key from edge functions secrets
  const webhookSecret = Deno.env.get('CLERK_WEBHOOK_SECRET_DELETE_USER');
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

  // Return error is webhook secret is not found
  if (!webhookSecret) {
    return new Response('Unauthorized: Webhook secret not found', {
      status: 401,
    });
  }

  // Retrieve svix-id, svix-timestamp, and svix-signature from request headers
  const svix_id = req.headers.get('svix-id') ?? '';
  const svix_timestamp = req.headers.get('svix-timestamp') ?? '';
  const svix_signature = req.headers.get('svix-signature') ?? '';

  // Create a new Webhook instance with the webhook secret
  const sivx = new Webhook(webhookSecret);
  // Retrieve the request body
  const body = await req.text();

  // Verify the request body using the svix-id, svix-timestamp, and svix-signature
  try {
    sivx.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (_err) {
    // Return error if verification fails
    return new Response('Unauthorized: Invalid headers used', {
      status: 401,
    });
  }

  try {
    // Parse the request body as JSON
    const parsedRequest = JSON.parse(body);
    // Extract the user ID from the parsed request
    const userId = parsedRequest.data.id;

    const webhookAuthHeader = req.headers.get('Authorization') ?? '';
    const AnonKey = webhookAuthHeader.replace('Bearer ', '');

    const supabase = await createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      AnonKey,
      { global: { headers: { Authorization: `Bearer ${serviceKey}` } } }
    );

    if (parsedRequest.type === 'user.deleted') {
      const { error } = await supabase.from('users').delete().eq('id', userId);

      if (error) {
        return new Response(error.message, {
          status: 400,
        });
      }
    } else {
      return new Response('Incorrect event type', {
        status: 400,
      });
    }
  } catch (err) {
    return new Response(JSON.stringify(err, null, 2), { status: 500 });
  }

  return new Response('Success', {
    status: 200,
  });
});
