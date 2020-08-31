import { container } from 'tsyringe';

import IHashProvider from './hash-provider/hash-provider.interface';
import BCryptHashProvider from './hash-provider/bcrypt-hash.provider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
