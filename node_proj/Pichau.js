module.exports = class Pichau {
  #initialPage;
  #regex_pages_of_interest;
  #regex_products;
  #selectedUrls;
  #index;
  #data;
  #unwanted;
  #product_url;
  #title_selector;
  #price_selector;

  constructor() {
    this.#regex = "https://www.pichau.com.br.*";
    this.#regex_products = "https://www.pichau.com.br(/[^#/]+){3}/?";
    this.#selectedUrls = [];
    this.#index = -1;
    this.#data = [];
    this.#unwanted = [];
    this.#product_url = [];
    this.#title_selector = "h1";
    this.#price_selector = ".price-boleto";
    this.#initialPage =
      "https://www.pichau.com.br/hardware/placa-de-video/placa-de-video-asus-geforce-gt-1030-2gb-gddr5-64-bit-gt1030-sl-2g-brk";
  }

  getInitialPage() {
    return this.#initialPage;
  }

  getRegexPagesOfInterest() {
    return this.#regex_pages_of_interest;
  }

  getRegexProducts() {
    return this.#regex_products;
  }

  getTitleSelector() {
    return this.#title_selector;
  }

  getPriceSelector() {
    return this.#price_selector;
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
    return this.#unwanted.length;
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
    this.#product_url.push(url);
  }

  notInProductUrl(url) {
    return this.#unwanted.indexOf(url) == -1;
  }

  notInUnwatedUrl(url) {
    return this.#unwanted.indexOf(url) == -1;
  }

  setUnwatedUrl(url) {
    this.#unwanted.push(url);
  }
};
