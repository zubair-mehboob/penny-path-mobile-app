import AsyncStorage from "@react-native-async-storage/async-storage";

export class AsyncStorageService {
  public static async get(key: string) {
    return await AsyncStorage.getItem(key);
  }

  public static async set(key: string, value: any) {
    return await AsyncStorage.setItem(key, JSON.stringify(value));
  }
}
