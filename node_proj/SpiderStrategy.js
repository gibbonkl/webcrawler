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
  getSelectedUrls() {}
  setSelectedUrl(url) {}
  getSelectedUrlsLength() {}
  notInSelectedUrls(url) {}
  setProductUrl(url) {}
  notInProductUrl(url) {}
  notInUnwatedUrl(url) {}
  setUnwatedUrl(url) {}
};
