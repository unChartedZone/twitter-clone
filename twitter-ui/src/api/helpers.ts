export function getQueryParams(url: string): Record<string, string> {
  const queryString = url.split("?")[1];
  const params: Record<string, string> = {};

  if (queryString) {
    const searchParams = new URLSearchParams(queryString);

    searchParams.forEach((value, key) => {
      params[key] = value;
    });
  }

  return params;
}
