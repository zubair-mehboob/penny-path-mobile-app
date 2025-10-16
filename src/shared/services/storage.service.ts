import AsyncStorage from "@react-native-async-storage/async-storage";
import { BehaviorSubject } from "rxjs";

/**
 * Define all the keys you plan to store in AsyncStorage here.
 * Each key has a defined value type, giving IntelliSense everywhere.
 */
export interface StorageSchema {
  token: string;
  user: { userId: number; name: string; email: string } | null;
  theme: "light" | "dark";
}

/**
 * StorageService class — type-safe + reactive
 */
class StorageService {
  private cache: Partial<StorageSchema> = {};
  private initialized = false;

  // RxJS subjects for each key
  private subjects = new Map<keyof StorageSchema, BehaviorSubject<any>>();

  /** Initialize cache and BehaviorSubjects */
  async init() {
    if (this.initialized) return;

    const keys = Object.keys(this.defaultValues()) as (keyof StorageSchema)[];
    const values = await AsyncStorage.multiGet(keys as string[]);

    values.forEach(([key, value]) => {
      const parsed =
        value !== null
          ? JSON.parse(value)
          : this.defaultValues()[key as keyof StorageSchema];
      this.cache[key as keyof StorageSchema] = parsed;
      this.subjects.set(
        key as keyof StorageSchema,
        new BehaviorSubject(parsed)
      );
    });

    // Initialize any missing subjects
    for (const key of keys) {
      if (!this.subjects.has(key)) {
        const def = this.defaultValues()[key];
        this.subjects.set(key, new BehaviorSubject(def));
      }
    }

    this.initialized = true;
  }

  /** Default values for all keys */
  private defaultValues(): StorageSchema {
    return {
      token: "",
      user: null,
      theme: "light",
    };
  }

  /** Get a cached value (sync) */
  get<K extends keyof StorageSchema>(key: K): StorageSchema[K] {
    if (!this.initialized)
      console.warn("⚠️ StorageService not initialized yet. Call init() first.");
    return (this.cache[key] ?? this.defaultValues()[key]) as StorageSchema[K];
  }

  /** Set value (updates cache, storage, and notifies subscribers) */
  async set<K extends keyof StorageSchema>(
    key: K,
    value: StorageSchema[K]
  ): Promise<void> {
    this.cache[key] = value;
    await AsyncStorage.setItem(key, JSON.stringify(value));
    this.subjects.get(key)?.next(value);
  }

  /** Observable for a specific key — reactive stream */
  observe<K extends keyof StorageSchema>(key: K) {
    const subject = this.subjects.get(key);
    if (!subject) throw new Error(`No subject found for key: ${key}`);
    return subject.asObservable() as import("rxjs").Observable<
      StorageSchema[K]
    >;
  }

  /** Get all values at once */
  getAll(): StorageSchema {
    return {
      ...this.defaultValues(),
      ...this.cache,
    };
  }

  /** Remove all keys */
  async removeAll(): Promise<void> {
    const keys = Object.keys(this.defaultValues());
    await AsyncStorage.multiRemove(keys);
    this.cache = this.defaultValues();
    for (const [key, subject] of this.subjects) {
      subject.next(this.defaultValues()[key]);
    }
  }
}

export const storageService = new StorageService();
