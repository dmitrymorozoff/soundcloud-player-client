export default class Bookmarks {
  constructor(container) {
    this.container = container;
    this.list = [];
  }
  notify(item) {
    this.list.push(item);
    console.log(item);
  }
}
