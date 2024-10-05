export function validateUsername(username: string): string {
  if (username.length < 3) {
    return "Username must be at least 3 characters long";
  }
  return "";
}

export function validatePassword(password: string): string {
  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }
  return "";
}

export function validateConfirmPassword(
  password: string,
  confirm: string
): string {
  if (password !== confirm) {
    return "Passwords don't match";
  }
  return "";
}
