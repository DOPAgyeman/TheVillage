/* eslint-disable max-lines-per-function */
//@ts-nocheck: unable to resolve tsc compatibility with deno

import { createClient } from 'supabase';
import { Webhook } from 'svix';

import { userSchema } from '../_shared/schema.ts';

Deno.serve(async (req: Request) => {
  const webhookSecret = Deno.env.get('CLERK_WEBHOOK_SECRET');
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

  if (!webhookSecret) {
    return new Response('Unauthorized: Webhook secret not found', {
      status: 401,
    });
  }

  const svix_id = req.headers.get('svix-id') ?? '';
  const svix_timestamp = req.headers.get('svix-timestamp') ?? '';
  const svix_signature = req.headers.get('svix-signature') ?? '';

  const sivx = new Webhook(webhookSecret);
  const body = await req.text();
  try {
    sivx.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (_err) {
    return new Response('Unauthorized: Invalid headers used', { status: 401 });
  }

  try {
    const parsedRequest = JSON.parse(body);
    const userId = parsedRequest.data.id;

    const first_name = parsedRequest.data.first_name;
    const last_name = parsedRequest.data.last_name;
    const full_name =
      parsedRequest.data.first_name + ' ' + parsedRequest.data.last_name;
    const date_of_birth = parsedRequest.data.unsafe_metadata.birthday;

    const primaryEmailId = parsedRequest.data.primary_email_address_id;
    const email_address =
      parsedRequest.data.email_addresses.find(
        (email: { id: string }) => email.id === primaryEmailId
      )?.email_address || '';

    const verifiedExternalAccounts = parsedRequest.data.external_accounts.map(
      (e: { verification_status: string; provider: string }) => {
        if (e.verification_status === 'verified') {
          return e.provider;
        }
      }
    );
    const image_url =
      parsedRequest.data.has_image === true ? parsedRequest.data.image_url : '';

    const parseSchemaResult = userSchema.safeParse({
      id: userId,
      first_name: first_name,
      last_name: last_name,
      full_name: full_name,
      date_of_birth: date_of_birth,
      email_address: email_address,
      external_accounts: verifiedExternalAccounts,
      image_url: image_url,
    });

    if (!parseSchemaResult.success) {
      return new Response('Incorrect user data shape', { status: 400 });
    }

    const webhookAuthHeader = req.headers.get('Authorization') ?? '';
    const AnonKey = webhookAuthHeader.replace('Bearer ', '');

    const supabase = await createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      AnonKey,
      { global: { headers: { Authorization: `Bearer ${serviceKey}` } } }
    );

    if (parsedRequest.type === 'user.created') {
      const { error } = await supabase.from('users').insert({
        id: userId,
        first_name: first_name,
        last_name: last_name,
        full_name: full_name,
        date_of_birth: date_of_birth,
        email_address: email_address,
        external_accounts: verifiedExternalAccounts,
        image_url: image_url,
      });

      if (error) {
        return new Response(error.message, {
          status: 400,
        });
      }
    }
  } catch (err) {
    return new Response(JSON.stringify(err, null, 2), { status: 500 });
  }

  return new Response('Successfully created user', {
    status: 200,
  });
});
