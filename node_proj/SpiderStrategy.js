module.exports = class SpiderStrategy {
  constructor() {
    if (this.constructor === Widget) {
      throw new TypeError(
        'Abstract class "Widget" cannot be instantiated directly.'
      );
    }

    if (this.schema === undefined) {
      throw new TypeError("Classes extending the widget abstract class");
    }
  }

  getTitleSelector() {
    return pass;
  }

  getPriceSelector() {
    return pass;
  }

  getInitialPage() {
    return pass;
  }

  getRegexPagesOfInterest() {
    return pass;
  }

  getRegexProducts() {
    return pass;
  }

  incrementIndex() {}

  getIndex() {
    return pass;
  }

  setData(extracted) {}

  getData() {
    return pass;
  }

  getNextUrl() {
    return pass;
  }

  getUnwatedUrlsLength() {
    return pass;
  }

  getSelectedUrls() {
    return pass;
  }

  setSelectedUrl(url) {}

  getSelectedUrlsLength() {
    return pass;
  }

  notInSelectedUrls(url) {
    return pass;
  }

  setProductUrl(url) {}

  notInProductUrl(url) {
    return pass;
  }

  notInUnwatedUrl(url) {
    return pass;
  }

  setUnwatedUrl(url) {}
};
