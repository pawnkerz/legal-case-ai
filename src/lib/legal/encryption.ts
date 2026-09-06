export interface EncryptedFieldEnvelope {
  algorithm: "AES-256-GCM";
  keyVersion: string;
  ciphertext: string;
  iv: string;
  tag: string;
}

export const HIGH_SENSITIVITY_FIELDS = ["a_number", "ssn", "passport_number", "alien_registration_number"] as const;
