export class BaseApi {
  get(url) {
    return fetch(url).then((response) => response.json());
  }

  constructor() {}
}
