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

export const doFetch = async <T>(
  url: string,
  options?: RequestOptions
): Promise<T> => {
  // Lets define the request options here.
  const requestOptions: RequestOptions = {
    headers: {
      "Content-Type": "application/json",
      apiKey: options?.apiKey ?? "",
      ...(options?.headers || {}),
    },
    ...options,
  };

  let response: Response;

  if (!options?.apiKey) {
    throw new Error("No API key provided.");
  }

  try {
    response = await fetch(url, requestOptions);
  } catch (error: unknown) {
    throw new Error(`Network error, unable to fetch ${url}: ${error}`);
  }

  if (!response.ok) {
    let errMsg: string;
    try {
      const errBody = (await response.json()) as any;
      errMsg = errBody.error || response.statusText;
    } catch (e) {
      errMsg = response.statusText;
    }
    throw new Error(`${response.status} - ${errMsg}`);
  }

  let data: T;
  try {
    const contentType = response.headers.get('content-type');
    data = contentType?.includes('application/json') ? await response.json() : await response.text() as any;
  } catch (error) {
    throw new Error(
      `Parsing error, could not parse fetch response from ${url}: ${error}`
    );
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
