export default class MoviesHelper {
  constructor() {
    this.apiKey = "?api_key=191afa11366f646301a60a16fee09d34";
    this.url = `https://api.themoviedb.org/3/`;
  }
  getApiKey() {
    return this.apiKey;
  }
  getUrl() {
    return this.url;
  }
  getData(url) {
    let fullUrl = url;
    return new Promise(function(resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", fullUrl);
      xhr.onload = function() {
        if (xhr.status === 200) {
          let json = JSON.parse(xhr.response);
          resolve(json);
        } else {
          reject(xhr.statusText);
        }
      };
      xhr.onerror = function(error) {
        reject(error);
      };
      xhr.send();
    });
  }
}
