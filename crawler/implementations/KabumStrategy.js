const SpiderStrategy = require("../SpiderStrategy");

module.exports = class KabumStrategy extends SpiderStrategy {
  #initialPage;
  #regexPagesOfInterest;
  #regexProducts;
  #selectedUrls;
  #index;
  #data;
  #unwantedUrls;
  #productUrls;
  #website;

  constructor() {
    super();
    this.#regexPagesOfInterest = "[^#]*www.kabum.com.br/[^#]+$";
    this.#regexProducts = "[^#]*www.kabum.com.br[^#]*/produto[^#]*$";
    this.#website = "Kabum";
    this.#selectedUrls = [];
    this.#index = 0;
    this.#data = [];
    this.#unwantedUrls = [];
    this.#productUrls = [];
    this.#initialPage =
      "https://www.kabum.com.br/cgi-local/site/produtos/descricao_ofertas.cgi?codigo=102746";
  }

  getTitleSelector() {
    return () => document.querySelector("h1").textContent;
  }

  getPriceSelector() {
    return () =>
      document
        .querySelector(".div.preco_normal-cm")
        .textContent.match(/([0-9]+),([0-9]+)/)[0];
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

  setData(extracted) {
    this.#data.push(extracted);
  }

  getData() {
    return this.#data;
  }

  getNextUrl() {
    return this.#selectedUrls[this.#index];
  }

  getUnwatedUrlsLength() {
    return this.#unwantedUrls.length;
  }

  getSelectedUrls() {
    return this.#selectedUrls;
  }

  setSelectedUrl(url) {
    this.#selectedUrls.push(url);
  }

  getSelectedUrlsLength() {
    return this.#selectedUrls.length;
  }

  notInSelectedUrls(url) {
    return this.#selectedUrls.indexOf(url) == -1;
  }

  setProductUrl(url) {
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
