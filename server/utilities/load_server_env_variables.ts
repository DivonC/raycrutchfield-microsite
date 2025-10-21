import 'server-only';
export const runtime = 'nodejs'

import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';
//@ts-ignore
import { env } from '../../env.mjs';
import { z } from 'zod';



interface SecretConfig {
    RECAPTCHA_SECRET_KEY: string;
    STRIPE_SECRET_KEY: string;
    SENDGRID_API_KEY: string;
    SENDGRID_NEWSLETTER_API_KEY: string;
    SENDGRID_NEWSLETTER_LIST_ID: string;
}

// Define Zod schema to validate the shape
const SecretConfigSchema = z.object({
    RECAPTCHA_SECRET_KEY: z.string(),
    STRIPE_SECRET_KEY: z.string(),
    SENDGRID_API_KEY: z.string(),
    SENDGRID_NEWSLETTER_API_KEY: z.string(),
    SENDGRID_NEWSLETTER_LIST_ID: z.string(),
});

const secretCacheObj: Record<string, any> = {};

const get_secret_config_no_cache = async (secretName:string): Promise<SecretConfig> => {
  // const client = new SecretsManagerClient({});
  // const command = new GetSecretValueCommand({ SecretId: secretName });

  // const response = await client.send(command);
  // return response.SecretString;

  const client = new SecretsManagerClient({region: 'us-east-2' });
  const command = new GetSecretValueCommand({ SecretId: secretName });

  const response = await client.send(command);
  const secretData = response.SecretString ? (JSON.parse(response.SecretString) as unknown) : {};

  // Validate secret shape
  return SecretConfigSchema.parse(secretData) as SecretConfig;
};

export const get_secret_config = async (): Promise<SecretConfig> => {
    let secretName = env.FRONTEND_SECRET_NAME;
  if (secretCacheObj[secretName]) return secretCacheObj[secretName]; // Avoid re-fetching

  const secretConfig = await get_secret_config_no_cache(secretName);
  secretCacheObj[secretName] = secretConfig; // Cache the result
  return secretConfig;
};