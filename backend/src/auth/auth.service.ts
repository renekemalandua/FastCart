import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Redis } from 'ioredis';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {
  constructor(private readonly redis: Redis) { }

  async login(email: string): Promise<{ message: string; email: string; sessionId: string }> {
    const sessionId = randomUUID();
    await this.redis.set(`session:${sessionId}`, email, 'EX', 60 * 60);
    return {
      message: "User authenticated successfully",
      email,
      sessionId,
    };
  }

  async getMe(sessionId: string) {
    const email = await this.redis.get(`session:${sessionId}`);

    if (!email) {
      throw new UnauthorizedException('Invalid session');
    }

    return {
      email,
      sessionId,
    };
  }
}