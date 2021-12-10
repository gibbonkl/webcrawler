const SpiderStrategy = require("../SpiderStrategy");

module.exports = class PichauStrategy extends SpiderStrategy {
  #store;
  #initialPage;
  #regexPagesToCrawl;
  #regexProducts;
  #urlsToAccess;
  #index;

  constructor() {
    super();
    this.#store = "Pichau";
    this.#initialPage = "https://www.pichau.com.br/";
    this.#regexPagesToCrawl = ".*www.pichau.com.br.*";
    this.#regexProducts = ".*www.pichau.com.br\/([^#/.]+-.[^#/.]+){2,}\/?$";
    this.#index = 0;

    /* initial interest urls */
    this.#urlsToAccess = [
      'https://www.pichau.com.br/hardware', 
      'https://www.pichau.com.br/perfericos',
      'https://www.pichau.com.br/eletronicos/'
    ];
    
    for (let i = 2; i < 20; i++) {
      this.#urlsToAccess.push(this.#urlsToAccess[0] + `?page=${i}`)
      this.#urlsToAccess.push(this.#urlsToAccess[1] + `?page=${i}`)
      this.#urlsToAccess.push(this.#urlsToAccess[2] + `?page=${i}`)
    }
  }

  getTitleSelector() {
    return () => document.querySelector("h1").textContent;
  }

  getPriceSelector() {
    return () =>
      document.querySelector(".jss69").textContent.match(/([0-9]+),([0-9]+)/)[0].replace(',','.');
  }

  getStore() {
    return this.#store;
  }

  getInitialPage() {
    return this.#initialPage;
  }

  getRegexPagesToCrawl() {
    return this.#regexPagesToCrawl;
  }

  getRegexProducts() {
    return this.#regexProducts;
  }

  incrementIndex() {
    this.#index++;
  }

  getIndex() {
    return this.#index;
  }

  getNextUrl() {
    return this.#urlsToAccess[this.#index];
  }

  getUrlsToAccess() {
    return this.#urlsToAccess;
  }

  setUrlToAccess(url) {
    this.#urlsToAccess.push(url);
  }

  getUrlsToAccessLength() {
    return this.#urlsToAccess.length;
  }

  notInUrlsToAccess(url) {
    return this.#urlsToAccess.indexOf(url) == -1;
  }

};
