
export interface PasswordRequirement {
  text: string;
  test: (password: string) => boolean;
}

export const passwordRequirements: PasswordRequirement[] = [
  { text: "Au moins 12 caractères", test: (p) => p.length >= 12 },
  { text: "Une majuscule", test: (p) => /[A-Z]/.test(p) },
  { text: "Une minuscule", test: (p) => /[a-z]/.test(p) },
  { text: "Un chiffre", test: (p) => /[0-9]/.test(p) },
  { text: "Un caractère spécial", test: (p) => /[^A-Za-z0-9]/.test(p) },
  { text: "Pas de caractères répétitifs", test: (p) => !/(.)\1{2,}/.test(p) }
];

export const validatePassword = (password: string): boolean => {
  return passwordRequirements.every(req => req.test(password));
};

export const checkPasswordsMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword && password.length > 0;
};
