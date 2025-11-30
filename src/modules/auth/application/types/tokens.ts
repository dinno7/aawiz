import { UUID } from 'crypto';

export type GeneratedToken = {
  token: string;
  masAgeSec: number;
};

export type GeneratedAuthTokens = {
  accessToken: GeneratedToken;
  refreshToken: GeneratedToken;
};

export enum TokenType {
  ACCESS = 'access',
  REFRESH = 'refresh',
}

interface BaseTokenPayload {
  id: UUID;
  type: TokenType;
  iat: number;
  exp: number;
  tokenId?: string;
  aud?: string;
  iss?: string;
}

export interface AccessTokenPayload extends BaseTokenPayload {
  type: TokenType.ACCESS;
}

export interface RefreshTokenPayload extends BaseTokenPayload {
  type: TokenType.REFRESH;
  tokenId: string;
}

export type AuthTokenPayload = AccessTokenPayload | RefreshTokenPayload;
