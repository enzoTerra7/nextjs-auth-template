export interface IEncryptService {
  hash(stringToHash: string): Promise<string>;
  compare(stringToCompare: string, hash: string): Promise<boolean>;
}
