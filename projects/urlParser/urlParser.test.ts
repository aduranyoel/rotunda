import { urlParser } from './urlParser';

describe('Url Parser', () => {
  test('should parse a url with query params', () => {
    const urlFormat = '/:version/api/:collection/:id';
    const urlInstance = '/6/api/listings/3?sort=desc&limit=10';

    const urlParsed = urlParser(urlFormat, urlInstance);

    expect(urlParsed).toEqual({
      version: '6',
      collection: 'listings',
      id: '3',
      sort: 'desc',
      limit: '10',
    });
  });

  test('should parse a url without query params', () => {
    const urlFormat = '/:version/api/:collection/:id';
    const urlInstance = '/6/api/listings/3';

    const urlParsed = urlParser(urlFormat, urlInstance);

    expect(urlParsed).toEqual({
      version: '6',
      collection: 'listings',
      id: '3',
    });
  });
});
