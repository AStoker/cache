/**
* Specifies the default set of cache storage options.
*/
interface CacheStorageOption {
  /**
  * Specifies that the cache should be stored in memory only.
  */
  memory: string,
  /**
  * Specifies that the cache should be stored in sessionStorage.
  */
  session: string,
  /**
  * Specifies that the cache should be stored in localStorage.
  */
  local: string
}

/**
* Specifies the default set of cache storage options.
*/
export const cacheStorageOption: CacheStorageOption = {
  memory: 'string',
  session: 'session',
  local: 'local'
};

/**
* Indicates that a class can be used by the cache for storage of cache items.
*/
interface CacheStorage {
  /**
  * Sets an item in the storage with the provided key and value.
  * @key The storage item's key.
  * @value The storage item's value;
  */
  setItem(key: string, value: string);
  /**
  * Gets an item from the storage with the provided key.
  * @key The storage item's key.
  * @return The storage item's value;
  */
  getItem(key: string): string;
  /**
  * Removes an item from the storage with the provided key.
  * @key The storage item's key.
  */
  removeItem(key: string): void;
}

/**
* An implementation of CacheStorage that stores cache items in memory.
*/
export class InMemoryCacheStorage {
  _state = {};

  /**
  * Sets an item in the storage with the provided key and value.
  * @key The storage item's key.
  * @value The storage item's value;
  */
  setItem(key: string, value: string) {
    this._state[key] = value;
  }

  /**
  * Gets an item from the storage with the provided key.
  * @key The storage item's key.
  * @return The storage item's value;
  */
  getItem(key: string): string {
    return this._state[key];
  }

  /**
  * Removes an item from the storage with the provided key.
  * @key The storage item's key.
  */
  removeItem(key: string) {
    delete this._state[key];
  }
}
