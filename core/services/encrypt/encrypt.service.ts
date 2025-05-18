import bcrypt from "bcrypt";
import type { IEncryptService } from "./encrypt.service.definition";

export class EncryptService implements IEncryptService {
  private readonly bcrypt: typeof bcrypt;
  constructor() {
    // pass and setup repositories here
    this.bcrypt = bcrypt;
  }

  async hash(stringToHash: string): Promise<string> {
    return await this.bcrypt.hash(stringToHash, 10);
  }

  async compare(stringToCompare: string, hash: string): Promise<boolean> {
    return await this.bcrypt.compare(stringToCompare, hash);
  }
}
