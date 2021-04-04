module.exports = class Kabum {
  #initialPage;
  #regex_pages_of_interest;
  #regex_products;
  #selectedUrls;
  #index;
  #data;
  #unwanted;
  #product_url;

  constructor() {
    this.#regex_pages_of_interest = "https://www.kabum.com.br/.*";
    this.#regex_products = "https://www.kabum.com.br.*/produto.*";
    this.#selectedUrls = [];
    this.#index = -1;
    this.#data = [];
    this.#unwanted = [];
    this.#product_url = [];
    this.#initialPage =
      "https://www.kabum.com.br/cgi-local/site/produtos/descricao_ofertas.cgi?codigo=111107";
  }

  getTitleSelector() {
    return () => document.querySelector("h1").textContent;
  }

  getPriceSelector() {
    return () =>
      document
        .querySelector(".preco_traco")
        .textContent.match(/([0-9]+),([0-9]+)/)[0];
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
