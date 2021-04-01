module.exports = class Pichau {
  constructor() {
    this.initialPage = "https://www.pichau.com.br";
    this.maxPageLevel = "3";
    this.limitCrawledPages = 50;
    this.regex = new RegExp(
      "https://www.pichau.com.br" + "(/[^#/]+){0," + this.maxPageLevel + "}/?$"
    );

    this.selectedUrls = [];
    this.index = -1;
    this.data = [];
    this.unwanted = [];

    this.title_selector = "h1";
    this.price_selector = "span.price-boleto > span";
    this.category_selector = "li.item.category > a";
    this.price_matches = /$(.*),(.*)$/;
  }

  getInitialPage() {
    return this.initialPage;
  }

  getRegex() {
    return this.regex;
  }

  isInSelectedUrls(url) {
    return this.selectedUrls.indexOf(url) < 0 ? true : false;
  }

  getSelectedUrlsNumber() {
    return this.selectedUrls.lcength;
  }

  getNextUrl() {
    return this.selectedUrls[this.index];
  }

  getIndex() {
    return this.index;
  }

  getData() {
    return this.data;
  }

  getCategorySelector() {
    return this.category_selector;
  }

  getTitleSelector() {
    return this.title_selector;
  }

  getPriceSelector() {
    return this.price_selector;
  }

  getPriceRegex() {
    return this.price_matches;
  }

  getUnwatedUrlsNumber() {
    return this.unwanted.length;
  }

  SetUnwatedUrl(url) {
    this.unwanted.push(url);
  }

  setSelectedUrl(url) {
    this.selectedUrls.push(url);
  }

  IncrementIndex() {
    return this.index++;
  }

  setData([extracted]) {
    this.data.push([extracted]);
  }

  setUnwanted(link) {
    this.unwanted.push;
  }
};
