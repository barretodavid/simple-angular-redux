import { SimpleAngularReduxPage } from './app.po';

describe('simple-angular-redux App', function() {
  let page: SimpleAngularReduxPage;

  beforeEach(() => {
    page = new SimpleAngularReduxPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
