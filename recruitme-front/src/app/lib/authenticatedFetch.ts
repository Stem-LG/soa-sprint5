import { AuthService } from "../services/auth";

export const authenticatedFetch = async (
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> => {

  const authService = new AuthService();

  const authToken = authService.getToken();
  const headers = {
    ...init?.headers,
    Authorization: `Bearer ${authToken}`,
  };

  const authInit: RequestInit = {
    ...init,
    headers,
  };

  return fetch(input, authInit);
};