import ICacheProvider from '../cache-provider.interface';

interface ICacheDate {
  [key: string]: string;
}

export default class FakeCacheProvider implements ICacheProvider {
  private cache: ICacheDate = {};

  async save(key: string, value: any): Promise<void> {
    this.cache[key] = JSON.stringify(value);
  }

  async recover<T>(key: string): Promise<T | null> {
    const data = this.cache[key];

    if (!data) {
      return null;
    }

    const parseDate = JSON.parse(data);

    return parseDate as T;
  }

  async invalidate(key: string): Promise<void> {
    delete this.cache[key];
  }
}
