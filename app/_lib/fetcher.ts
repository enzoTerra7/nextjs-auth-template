import { getSession } from "./auth/dal";

/**
 * @description
 * In this example, we are using the fetch library to connect to the API
 * and execute queries.
 * The API is a personal config for the Fetch API.
 *
 * If you want to use a different library, you can replace the fetch library
 * with the library you want to use or install a new one.
 *
 * For example, you can use the axios library or the ky library.
 *
 * @see https://axios-http.com/
 * @see https://github.com/sindresorhus/ky
 */

type HeadersInterceptor = (
  headers: HeadersInit
) => HeadersInit | Promise<HeadersInit>;

interface NextJsFetcherOptions {
  baseURL?: string;
  headers?: HeadersInit;
}

export class NextJsFetcher {
  private baseURL?: string;
  private headers?: HeadersInit;
  private interceptorFn?: HeadersInterceptor;

  constructor(options?: NextJsFetcherOptions) {
    this.baseURL = options?.baseURL;
    this.headers = {
      ...options?.headers,
    };
  }

  interceptor(fn: HeadersInterceptor) {
    this.interceptorFn = fn;
  }

  private async prepareHeaders(
    headers: HeadersInit = {}
  ): Promise<HeadersInit> {
    if (this.interceptorFn) {
      return await this.interceptorFn({
        ...(this.headers || {}),
        ...headers,
      });
    }
    return { ...(this.headers || {}), ...headers };
  }

  private buildUrl(url: string) {
    return this.baseURL ? `${this.baseURL}${url}` : url;
  }

  async get<T = unknown>(
    url: string,
    options?: RequestInit
  ): Promise<
    PartiallyData & {
      data: T;
    }
  > {
    return this.request<T>(url, { ...options, method: "GET" });
  }

  async post<T = unknown>(
    url: string,
    body?: unknown,
    options?: RequestInit
  ): Promise<
    PartiallyData & {
      data: T;
    }
  > {
    // Check if body is FormData
    const isFormData = body instanceof FormData;

    // Don't stringify FormData and don't set Content-Type (browser will set it automatically)
    const processedBody = isFormData ? body : JSON.stringify(body);

    // For FormData, we should not set Content-Type header
    const headers = isFormData
      ? { ...options?.headers }
      : {
          "Content-Type": "application/json",
          ...(options?.headers || {}),
        };

    return this.request<T>(url, {
      ...options,
      method: "POST",
      body: processedBody,
      headers,
    });
  }

  async put<T = unknown>(
    url: string,
    body?: unknown,
    options?: RequestInit
  ): Promise<
    PartiallyData & {
      data: T;
    }
  > {
    const isFormData = body instanceof FormData;
    const processedBody = isFormData ? body : JSON.stringify(body);

    const headers = isFormData
      ? { ...options?.headers }
      : {
          "Content-Type": "application/json",
          ...(options?.headers || {}),
        };

    return this.request<T>(url, {
      ...options,
      method: "PUT",
      body: processedBody,
      headers,
    });
  }

  async delete<T = unknown>(
    url: string,
    options?: RequestInit
  ): Promise<
    PartiallyData & {
      data: T;
    }
  > {
    return this.request<T>(url, { ...options, method: "DELETE" });
  }

  async patch<T = unknown>(
    url: string,
    body?: unknown,
    options?: RequestInit
  ): Promise<
    PartiallyData & {
      data: T;
    }
  > {
    const isFormData = body instanceof FormData;
    const processedBody = isFormData ? body : JSON.stringify(body);

    const headers = isFormData
      ? { ...options?.headers }
      : {
          "Content-Type": "application/json",
          ...(options?.headers || {}),
        };

    return this.request<T>(url, {
      ...options,
      method: "PATCH",
      body: processedBody,
      headers,
    });
  }

  async request<T = unknown>(
    url: string,
    options: RequestInit
  ): Promise<
    PartiallyData & {
      data: T;
    }
  > {
    const headers = await this.prepareHeaders(options.headers || {});
    try {
      const response = await fetch(this.buildUrl(url), {
        ...options,
        headers,
      });

      const partiallyData = {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        options: {
          ...options,
          headers,
        },
      };

      if (!response.ok) {
        const err = await response
          .json()
          .then((data) => {
            return data;
          })
          .catch(() => {
            return null;
          });

        throw err;
      }

      const data = await response
        .json()
        .then((data) => data)
        .catch((json) => json);

      return {
        ...partiallyData,
        data: data as T,
      };
    } catch (error) {
      throw error;
    }
  }
}

type PartiallyData = {
  status: number;
  statusText: string;
  headers: Headers;
  options: RequestInit;
};

/**
 * @description
 * Here we create a new instance of the fetcher.
 * We pass the baseURL to the fetcher.
 * We also pass an interceptor to the fetcher.
 * The interceptor is a function that is called before the request is made.
 * It is used to add the Authorization header to the request.
 */
const fetcher = new NextJsFetcher({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

fetcher.interceptor(async (header) => {
  const session = await getSession();

  if (!session) {
    return header;
  }

  return {
    ...header,
    Authorization: `Bearer ${session}`,
  };
});

export default fetcher;
