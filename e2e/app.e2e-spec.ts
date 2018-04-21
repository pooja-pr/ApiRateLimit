import { ApiRateLimitPage } from './app.po';

describe('api-rate-limit App', () => {
  let page: ApiRateLimitPage;

  beforeEach(() => {
    page = new ApiRateLimitPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
