const SpiderStrategy = require("../SpiderStrategy");

module.exports = class PichauStrategy extends SpiderStrategy {
  #initialPage;
  #regexPagesOfInterest;
  #regexProducts;
  #urlsToAccess;
  #index;
  #data;//
  #unwantedUrls;
  #productUrls;//
  #website;

  constructor() {
    super();
    this.#regexPagesOfInterest = "www.pichau.com.br/[^#.]+$";
    this.#regexProducts = ".*www.pichau.com.br\/([^#/.]+-.[^#/.]+){2,}\/?$";
    this.#website = "Pichau";
    this.#urlsToAccess = [];
    this.#index = 0;
    this.#data = [];//
    this.#unwantedUrls = [];
    this.#productUrls = [];//
    this.#initialPage =
      "https://www.pichau.com.br/hardware/";
  }

  getTitleSelector() {
    return () => document.querySelector("h1").textContent;
  }

  getPriceSelector() {
    return () =>
      document.querySelector(".jss69").textContent.match(/([0-9]+),([0-9]+)/)[0].replace(',','.');
  }

  getWebsite() {
    return this.#website;
  }

  getInitialPage() {
    return this.#initialPage;
  }

  getRegexPagesOfInterest() {
    return this.#regexPagesOfInterest;
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

  setData(extracted) {//
    this.#data.push(extracted);
  }

  getData() {
    return this.#data;//
  }

  getNextUrl() {
    return this.#urlsToAccess[this.#index];
  }

  getUnwatedUrlsLength() {
    return this.#unwantedUrls.length;
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

  setProductUrl(url) { //
    this.#productUrls.push(url);
  }

  notInProductUrl(url) {
    return this.#unwantedUrls.indexOf(url) == -1;
  }

  notInUnwatedUrl(url) {
    return this.#unwantedUrls.indexOf(url) == -1;
  }

  setUnwatedUrl(url) {
    this.#unwantedUrls.push(url);
  }
};
