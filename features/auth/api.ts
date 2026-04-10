import axios from "axios";

const DUMMY_JSON_BASE_URL = "https://dummyjson.com";

type DummyLoginResponse = {
  accessToken: string;
};

export type LoginPayload = {
  username: string;
  password: string;
};

export async function login(payload: LoginPayload): Promise<string> {
  const response = await axios.post<DummyLoginResponse>(
    `${DUMMY_JSON_BASE_URL}/auth/login`,
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
