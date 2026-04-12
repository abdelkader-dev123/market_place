import * as Crypto from "expo-crypto";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "auth_token";
const ENCRYPTION_KEY = "enc_key";

async function getEncryptionKey(): Promise<string> {
  let key = await SecureStore.getItemAsync(ENCRYPTION_KEY);
  if (!key) {
    const random = await Crypto.getRandomBytesAsync(32);
    key = Array.from(random)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    await SecureStore.setItemAsync(ENCRYPTION_KEY, key);
  }
  return key;
}

function xorEncrypt(data: string, key: string): string {
  return Array.from(data)
    .map((char, i) =>
      (char.charCodeAt(0) ^ key.charCodeAt(i % key.length))
        .toString(16)
        .padStart(2, "0"),
    )
    .join("");
}

function xorDecrypt(hex: string, key: string): string {
  const bytes = hex.match(/.{2}/g) || [];
  return bytes
    .map((byte, i) =>
      String.fromCharCode(parseInt(byte, 16) ^ key.charCodeAt(i % key.length)),
    )
    .join("");
}

export async function setToken(token: string): Promise<void> {
  const key = await getEncryptionKey();
  const encrypted = xorEncrypt(token, key);
  await SecureStore.setItemAsync(TOKEN_KEY, encrypted);
}

export async function getToken(): Promise<string | null> {
  const encrypted = await SecureStore.getItemAsync(TOKEN_KEY);
  if (!encrypted) return null;
  const key = await getEncryptionKey();
  return xorDecrypt(encrypted, key);
}

export async function deleteToken(): Promise<void> {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}
