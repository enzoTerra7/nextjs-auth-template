export type SessionPayload = {
  userId: string;
  expiresAt: Date;
  role: UserRoles;
};

export type UserRoles = "admin" | "user";

export type FormState<T> =
  | {
      errors?: {
        [K in keyof T]?: string[];
      };
      message?: string | null;
    }
  | undefined;

type ParamsProps<T = undefined> = T extends undefined
  ? {
      params: Promise<{
        [key: string]: string;
      }>;
    }
  : {
      params: Promise<T>;
    };

type SearchParamsProps<T = undefined> = T extends undefined
  ? {
      searchParams: Promise<{
        [key: string]: string | string[] | undefined;
      }>;
    }
  : {
      searchParams: Promise<T>;
    };

export type PageProps<T = undefined, I = undefined> = ParamsProps<T> &
  SearchParamsProps<I>;
