import fs from 'fs/promises';
import path from 'path';
import h from 'handlebars';

async function getEmailBody<T>(data: T, fileName: string): Promise<string> {
  const file = path.resolve(__dirname, fileName);
  const content = await fs.readFile(file, 'utf8');
  const template = h.compile(content);
  const result = template(data);
  return result;
}

export async function getRegisterTemplate(
  email: string,
  name: string,
  code: string,
  domain: string
): Promise<string> {
  return getEmailBody({ email, name, code, domain }, 'register.template.html');
}

export async function getPasswordResetTemplate(
  email: string,
  name: string,
  code: string,
  domain: string
): Promise<string> {
  return getEmailBody(
    { email, name, code, domain },
    'reset-password.template.html'
  );
}

export async function getSelfHostedWelcomeEmailTemplate(
  name: string,
  key: string,
  dbPassword: string,
  pgAdminPassword: string,
  sessionSecret: string,
  email: string
): Promise<string> {
  return getEmailBody(
    { email, name, key, dbPassword, pgAdminPassword, sessionSecret },
    'self-hosted.template.html'
  );
}
