
export const delay = (amount = 750) =>
  new Promise((resolve) => setTimeout(resolve, amount));

export async function SignInRequest(data: { email: string }) {
  await delay(1);
  return {
    message: "User authenticated successfully",
    email: data.email,
    token: "ed9c6cab-763f-48b0-8159-b004a52fb4cf"
  }
}

export function recoverUserInformations(token: string, email: string) {
  const data = { token, email }
  return (data)
}

export function signOut() {
  return true;
}
