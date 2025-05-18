import { User } from "@/db/table/user";

export class UserDto {
  private _name: string;
  private _email: string;
  private _password: string;
  private _role: "admin" | "user";
  private _id: number;
  private _created_at: Date;
  private _email_verified_at: Date | null;

  constructor(data: {
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
    id: number;
    created_at: Date;
    email_verified_at: Date | null;
  }) {
    this._name = data.name;
    this._email = data.email;
    this._password = data.password;
    this._role = data.role;
    this._id = data.id;
    this._created_at = data.created_at;
    this._email_verified_at = data.email_verified_at;
  }

  public get name() {
    return this._name;
  }

  public get email() {
    return this._email;
  }

  public get role() {
    return this._role;
  }

  public get password() {
    return this._password;
  }

  public get id() {
    return this._id;
  }

  public get created_at() {
    return this._created_at;
  }

  public get email_verified_at() {
    return this._email_verified_at;
  }

  static fromDb(data: User): UserDto {
    return new UserDto({
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      id: data.id,
      created_at: data.createdAt,
      email_verified_at: data.emailVerifiedAt,
    });
  }
}
