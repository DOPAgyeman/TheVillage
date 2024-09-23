/* eslint-disable max-lines-per-function */
//@ts-nocheck: unable to resolve tsc compatibility with deno

import { createClient } from 'supabase';
import { Webhook } from 'svix';

import { userSchema } from '../_shared/schema.ts';

Deno.serve(async (req: Request) => {
  // Retrieve webhook secret and service role key from edge functions secrets
  const webhookSecret = Deno.env.get('CLERK_WEBHOOK_SECRET');
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
    return new Response('Unauthorized: Invalid headers used', { status: 401 });
  }

  try {
    // Parse the request body as JSON
    const parsedRequest = JSON.parse(body);
    // Extract the user ID from the parsed request
    const userId = parsedRequest.data.id || '';
    // Check if the event type is user.created or user.updated
    if (
      parsedRequest.type === 'user.created' ||
      parsedRequest.type === 'user.updated'
    ) {
      // Retrieve first name
      const first_name = parsedRequest.data.first_name || '';
      // Retrieve last name
      const last_name = parsedRequest.data.last_name || '';
      // Construct full name
      const full_name =
        parsedRequest.data.first_name + ' ' + parsedRequest.data.last_name ||
        '';
      // Retrieve date of birth
      const date_of_birth = parsedRequest.data.unsafe_metadata.birthday || null;
      // Retrieve primary email address ID
      const primaryEmailId = parsedRequest.data.primary_email_address_id || '';
      // Retrieve primary email address
      const email_address =
        parsedRequest.data.email_addresses.find(
          (email: { id: string; verification: { status: string } }) =>
            email.id === primaryEmailId &&
            email.verification.status === 'verified'
        )?.email_address || '';
      // Retrieve verified external accounts
      const verifiedExternalAccounts =
        parsedRequest.data.external_accounts.map(
          (e: {
            verification: { status: string; strategy: string };
            provider: string;
          }) => {
            if (e.verification.status === 'verified') {
              return e.verification.strategy;
            }
          }
        ) || [];
      // Retrieve image URL
      const image_url =
        parsedRequest.data.has_image === true
          ? parsedRequest.data.image_url
          : '';
      // Parse user data using the userSchema
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
      // Throw error if the user data shape is incorrect
      if (!parseSchemaResult.success) {
        return new Response('Incorrect user data shape', {
          status: 400,
        });
      }
      // Retrieve the webhook authorization header
      const webhookAuthHeader = req.headers.get('Authorization') ?? '';
      // Remove the 'Bearer ' prefix from the webhook authorization header
      const AnonKey = webhookAuthHeader.replace('Bearer ', '');
      // Create a new Supabase client with the Supabase URL, AnonKey, and serviceKey
      const supabase = await createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        AnonKey,
        { global: { headers: { Authorization: `Bearer ${serviceKey}` } } }
      );
      // Perform database operations if new user has been created
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
        // Throw error if there is an issue with adding the user to the database
        if (error) {
          return new Response(error.message, {
            status: 400,
          });
        }
      }
      // Perform database operations if user has been updated
      else if (parsedRequest.type === 'user.updated') {
        const { error } = await supabase
          .from('users')
          .update({
            id: userId,
            first_name: first_name,
            last_name: last_name,
            full_name: full_name,
            date_of_birth: date_of_birth,
            email_address: email_address,
            external_accounts: verifiedExternalAccounts,
            image_url: image_url,
          })
          .eq('id', userId);
        // Throw error if there is an issue with updating the user in the database
        if (error) {
          return new Response(error.message, {
            status: 400,
          });
        }
      }
    }
    // Check if the event type is user.deleted
    else if (parsedRequest.type === 'user.deleted') {
      // Retrieve the webhook authorization header
      const webhookAuthHeader = req.headers.get('Authorization') ?? '';
      // Remove the 'Bearer ' prefix from the webhook authorization header
      const AnonKey = webhookAuthHeader.replace('Bearer ', '');
      // Create a new Supabase client with the Supabase URL, AnonKey, and serviceKey
      const supabase = await createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        AnonKey,
        { global: { headers: { Authorization: `Bearer ${serviceKey}` } } }
      );
      // Perform database operations if user has been deleted
      const { error } = await supabase.from('users').delete().eq('id', userId);
      // Throw error if there is an issue with deleting the user from the database
      if (error) {
        return new Response(error.message, {
          status: 400,
        });
      }
    }

    // Throw error if the event type is incorrect
    else {
      return new Response('Incorrect event type', {
        status: 400,
      });
    }
  } catch (err) {
    // Return an error if an operation within the try block failed
    return new Response(JSON.stringify(`Bad request: ${err}`, null, 2), {
      status: 500,
    });
  }
  // Return a response indicating that the sync operation was successful
  return new Response('Success', {
    status: 200,
  });
});
