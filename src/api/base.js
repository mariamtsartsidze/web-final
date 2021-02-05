export class Base {
  get(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
      const response = xhr.responseText;
      if (callback) callback(response);
    };
    xhr.send();
  }

  constructor() {}
}
