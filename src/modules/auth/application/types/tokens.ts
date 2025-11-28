import { UUID } from 'crypto';

export type TokensGenerated = {
  accessToken: string;
  refreshToken: string;
};

type TokenPayload = {
  id: UUID;
  iat: number;
  exp: number;
  aud?: string;
  iss?: string;
};

export type AccessTokenPayload = TokenPayload & { type: 'access' };
export type RefreshTokenPayload = TokenPayload & {
  type: 'refresh';
  tokenId: string;
};
