import { hash, genSalt, compare } from 'bcryptjs';
import IHashProvider from './hash-provider.interface';

class BCryptHashProvider implements IHashProvider {
  async generateHash(payload: string): Promise<string> {
    const salt = await genSalt(10);
    const hashed = await hash(payload, salt);

    return hashed;
  }

  async compareHash(payload: string, hashed: string): Promise<boolean> {
    const passwordMatched = await compare(payload, hashed);

    return passwordMatched;
  }
}

export default BCryptHashProvider;
