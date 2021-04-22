import { RubberbandClientPage } from './app.po';

describe('rubberband-client App', function() {
  let page: RubberbandClientPage;

  beforeEach(() => {
    page = new RubberbandClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
