/**
 * Parses a given URL according to the URL format
 * @param urlFormat {string} describes the format of the url.
 * @param urlInstance {string} url with values. It may contain query params .
 * @returns {Record<string, string>} The hash with URL variables.
 */
export function urlParser(urlFormat: string, urlInstance: string) {
  const isParam = new RegExp('^:');
  const [instance, query] = urlInstance.split('?');
  const instanceValues = instance.split('/');

  const params = urlFormat.split('/').reduce((acc, chunk, i) => {
    if (isParam.test(chunk)) {
      acc[chunk.slice(1)] = instanceValues[i];
    }
    return acc;
  }, {} as Record<string, string>);

  const queryParams = query?.split('&').reduce((acc, pair) => {
    const [key, value] = pair.split('=');
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  return { ...params, ...queryParams };
}
