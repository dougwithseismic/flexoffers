import fetch from "cross-fetch";

/**
 * Custom type for better error handling
 */
type FetchError = {
  type: "fetch-error" | "api-error" | "parsing-error";
  message: string;
};

export interface RequestOptions extends RequestInit {
  apiKey?: string;
}
/**
 * An asynchronous function that wraps the native fetch function providing enhanced error handling.
 * Automatically includes 'Content-Type': 'application/json' header, but also allows other headers to be included optionally.
 *
 * @template T The expected return type.
 * @param {string} url The URL you want to fetch.
 * @param {RequestOptions} [options] The options you want to pass to the fetch function.
 * @returns {Promise<T>} Returns a Promise that resolves with the result of the fetch operation.
 * @throws {FetchError} Throws an error if there is a network, API or parsing error.
 */
export const doFetch = async <T>(
  url: string,
  options?: RequestOptions
): Promise<T> => {
  const requestOptions: RequestOptions = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      apiKey: options?.apiKey ?? "",
      ...options?.headers,
    },
  };

  let response: Response;
  try {
    response = await fetch(url, requestOptions);
  } catch (error: Error | unknown) {
    throw {
      type: "fetch-error",
      message: `Network error, unable to fetch ${url}: ${
        (error as Error)?.message ?? "Unknown error"
      }`,
    } as FetchError;
  }

  if (!response.ok) {
    let errMsg: string;
    try {
      const errBody = (await response.json()) as any;
      errMsg = errBody.error || response.statusText;
    } catch (e) {
      errMsg = response.statusText;
    }
    throw {
      type: "api-error",
      message: `${response.status} - ${errMsg}`,
      error: response,
    } as FetchError;
  }

  let data: T;
  try {
    data = (await response.json()) as T;
  } catch (error: Error | unknown) {
    throw {
      type: "parsing-error",
      message: `Parsing error, could not parse fetch response from ${url}: ${
        (error as Error)?.message ?? "Unknown error"
      }`,
    } as FetchError;
  }

  return data;
};

// Example Usage
/*
// GET request
try {
  const data = await doFetch<any>('https://api.example.com/resource');
  console.log(data);
} catch (error: unknown) {
  const err = error as FetchError;
  console.error(`GET Error: ${err.message}`);
}

// POST request
try {
  const postData = { key: 'value' };
  const data = await doFetch<any>('https://api.example.com/resource', {
    method: 'POST',
    body: JSON.stringify(postData),
  });
  console.log(data);
} catch (error: unknown) {
  const err = error as FetchError;
  console.error(`POST Error: ${err.message}`);
}

// PUT request
try {
  const putData = { key: 'newValue' };
  const data = await doFetch<any>('https://api.example.com/resource/1', {
    method: 'PUT',
    body: JSON.stringify(putData),
  });
  console.log(data);
} catch (error: unknown) {
  const err = error as FetchError;
  console.error(`PUT Error: ${err.message}`);
}

// DELETE request
try {
  const data = await doFetch<any>('https://api.example.com/resource/1', {
    method: 'DELETE',
  });
  console.log(data);
} catch (error: unknown) {
  const err = error as FetchError;
  console.error(`DELETE Error: ${err.message}`);
}
*/
