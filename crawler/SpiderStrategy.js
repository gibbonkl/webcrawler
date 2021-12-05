module.exports = class SpiderStrategy {
  constructor() {}

  getTitleSelector() {}
  getPriceSelector() {}
  getInitialPage() {}
  getRegexPagesOfInterest() {}
  getRegexProducts() {}
  incrementIndex() {}
  getIndex() {}
  setData(extracted) {}
  getData() {}
  getNextUrl() {}
  getUnwatedUrlsLength() {}
  getUrlsToAccess() {}
  setUrlToAccess(url) {}
  getUrlsToAccessLength() {}
  notInUrlsToAccess(url) {}
  setProductUrl(url) {}
  notInProductUrl(url) {}
  notInUnwatedUrl(url) {}
  setUnwatedUrl(url) {}
};
