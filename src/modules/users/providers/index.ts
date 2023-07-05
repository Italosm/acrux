import { container } from 'tsyringe';
import BcryptHashProvider from './HashProvider/implementations/BcryptHashProviders';
import { IHashProvider } from './HashProvider/models/IHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BcryptHashProvider);
