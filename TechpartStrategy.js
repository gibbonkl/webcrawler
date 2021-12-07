const SpiderStrategy = require("../SpiderStrategy");

module.exports = class TechpartStrategy extends SpiderStrategy {
  #store;
  #initialPage;
  #regexPagesToCrawl;
  #regexProducts;
  #urlsToAccess;
  #index;

  constructor() {
    super();
    this.#store = "Techpart";
    this.#initialPage = "https://www.techpartinfo.com.br/";
    this.#regexPagesToCrawl = ".*techpartinfo.com.br\/?[^#.]*$";
    this.#regexProducts = ".*www.techpartinfo.com.br\/produto\/([^#/.]+-.[^#/.]+){2,}\/?$";
    this.#urlsToAccess = [];
    this.#index = 0;
  }

  getTitleSelector() {
    return () => document.querySelector("h1").textContent;
  }

  getPriceSelector() {
    return () =>
    document.querySelector(".desconto-a-vista").innerText.match(/([0-9]*)\.?([0-9]+),([0-9]+)/)[0].replace(',','.');
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
