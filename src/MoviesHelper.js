export default class MoviesHelper {
    constructor() {
        this.apiKey = "?api_key=191afa11366f646301a60a16fee09d34";
        this.url = `https://api.themoviedb.org/3/discover/movie`;
        this.searchurl =
            "https://api.themoviedb.org/3/search/movie" + this.apikey + "&query=z";
    }
    getData(search) {
        let fullUrl = this.url + this.apiKey + search;
        return new Promise(function(resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", fullUrl);
            xhr.onload = function() {
                if (xhr.status === 200) {
                    let json = JSON.parse(xhr.response);
                    console.log(json);
                    resolve(json.results);
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