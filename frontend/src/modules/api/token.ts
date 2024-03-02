let token: string | undefined;

export function setToken(newToken: string | undefined) {
	token = newToken;
}
export function getToken(): string | undefined {
	return token;
}
