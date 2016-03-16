import {InMemoryCacheStorage, cacheStorageOption} from './cache-storage';

interface CacheConfiguration {
  storage?: string | CacheStorage;
}

let cacheConstructionKey = {};

export class CacheManager {
  _configurationLookup = {};
  _cacheLookup = {};
  _defaults = {
    storage: cacheStorageOption.memory
  };

  setDefaults(configuration: CacheConfiguration): CacheManager {
    Object.assign(this._defaults, configuration);
    return this;
  }

  configure(name: string, configuration?: CacheConfiguration): CacheManager {
    let key = 'aurelia:cache:' + name;

    if (key in this._configurationLookup) {
      throw new Error(`Cache ${name} has already been configured.`);
    }

    if (configuration) {
      configuration.key = key;
      configuration = Object.assign({}, this._defaults, configuration);
    } else {
      configuration = Object.assign({ key: key }, this._defaults);
    }

    this._configurationLookup[key] = configuration;

    return this;
  }

  getCache(name: string): Cache {
    let key = 'aurelia:cache:' + name;

    if (key in this._cacheLookup) {
      return this._cacheLookup[key];
    }

    let configuration = this._configurationLookup[key]
      || (this._configurationLookup[key] = Object.assign({ key: key }, this.defaultCofiguration));

    return (this._cacheLookup[key] = new Cache(configuration, cacheConstructionKey));
  }
}

export class CacheResolver {
  constructor(name: string) {
    this.name = name;
  }

  get(container): Cache {
    let manager = container.get(CacheManager);
    return manager.getCache(this.name);
  }
}

export class Cache {
  constructor(configuration: CacheConfiguration, constructionKey: any) {
    if (constructionKey !== cacheConstructionKey) {
      throw new Error('You cannot instantiate "Cache".');
    }

    this.configuration = configuration;
  }

  static of(name: string): CacheResolver {
    return new CacheResolver(name);
  }
}
