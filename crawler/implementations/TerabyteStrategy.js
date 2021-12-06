const SpiderStrategy = require("../SpiderStrategy");

module.exports = class TerabyteStrategy extends SpiderStrategy {
  #store;
  #initialPage;
  #regexPagesToCrawl;
  #regexProducts;
  #urlsToAccess;
  #index;

  constructor() {
    super();
    this.#store = "Terabyte";
    this.#initialPage = "http://www.terabyteshop.com.br/hardware";
    this.#regexPagesToCrawl = ".*terabyteshop.com.br\/?[^#.]*$";
    this.#regexProducts = ".*www.terabyteshop.com.br\/produto\/[0-9]+\/([^#/.]+-.[^#/.]+){2,}\/?$";
    this.#urlsToAccess = [];
    this.#index = 0;
  }

  getTitleSelector() {
    return () => document.querySelector("h1").textContent;
  }

  getPriceSelector() {
    return () =>
    document.querySelector(".valParc").textContent.match(/([0-9]*)\.?([0-9]+),([0-9]+)/)[0].replace('.','').replace(',','.');
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
