export interface Engine {
  encrypt(message: string): string;
  decrypt(encryptedMessage: string): string;
}
