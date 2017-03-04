import { StarsglPage } from './app.po';

describe('starsgl App', () => {
  let page: StarsglPage;

  beforeEach(() => {
    page = new StarsglPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
