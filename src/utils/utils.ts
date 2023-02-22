export interface Credential {
  message: string;
  signature: string;
}

export function getLocalCredential(address: string) {
  const value = global.localStorage.getItem(getCredentialLocalKey(address));

  return parseCredential(value);
}

export function createCredential(message: string, signature: string): Credential {
  return { message, signature };
}

export function setLocalCredential(address: string, value: Credential) {
  global.localStorage.setItem(getCredentialLocalKey(address), stringifyCredential(value));
}

export function removeLocalCredential(address: string) {
  global.localStorage.removeItem(getCredentialLocalKey(address));
}

function getCredentialLocalKey(address: string) {
  return `flink_${address}_credentials`;
}

function isCredential(value: unknown): value is Credential {
  return (
    value instanceof Object &&
    value != null &&
    ['message', 'signature'].every((prop) => prop in value)
  );
}

export function isValidCredential(value: Credential) {
  return Date.now() <= getMessageExpiration(value.message);
}

function parseCredential(value: string | null) {
  if (value == null) return null;

  try {
    const credential: unknown = JSON.parse(value);
    return isCredential(credential) ? credential : null;
  } catch {
    return null;
  }
}

function stringifyCredential(value: Credential) {
  return JSON.stringify(value);
}

const expireMark = 'Expiration: ';

// eslint-disable-next-line no-magic-numbers
export function generateMessage(expireIn = 24 * 60 * 60 * 1000) {
  return `Welcome to Flink!

Click to sign in

This request will not trigger a blockchain transaction or cost any gas fees.

Your authentication status will reset after 24 hours.

${expireMark}${Date.now() + expireIn}`;
}

export function getMessageExpiration(message: string) {
  return Number.parseInt(message.slice(message?.lastIndexOf(expireMark) + expireMark.length));
}
