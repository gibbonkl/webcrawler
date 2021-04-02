module.exports = class Kabum {
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
    this.#regex_pages_of_interest = "https://www.kabum.com.br/.*";
    this.#regex_products = "https://www.kabum.com.br.*/produto.*";
    this.#selectedUrls = [];
    this.#index = -1;
    this.#data = [];
    this.#unwanted = [];
    this.#product_url = [];
    this.#title_selector = "h1";
    this.#price_selector = ".preco_traco";
    this.#initialPage =
      "https://www.kabum.com.br/produto/112891/placa-m-e-asus-ex-b460m-v5-intel-lga-1200-matx-ddr4";
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
