import axios from "axios";

type DummyLoginResponse = {
  accessToken: string;
};

export type LoginPayload = {
  username: string;
  password: string;
};

export async function login(payload: LoginPayload): Promise<string> {
  const response = await axios.post<DummyLoginResponse>(
    `${process.env.EXPO_PUBLIC_API_URL}/auth/login`,
    {
      username: payload.username.trim(),
      password: payload.password,
      expiresInMins: 30,
    },
    {
      headers: { "Content-Type": "application/json" },
    },
  );

  return response.data.accessToken;
}
