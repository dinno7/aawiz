import { registerAs } from '@nestjs/config';

export const jwtConfig = registerAs('jwt', () => ({
  secret: process.env.JWT_ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
  accessTtlSec: parseInt(`${process.env.JWT_ACCESS_TOKEN_TTL}` || '3600', 10),
  refreshTtlSec: parseInt(
    `${process.env.JWT_REFRESH_TOKEN_TTL}` || '604800',
    10,
  ),
}));
