import { AngularAwsCustomerPage } from './app.po';

describe('handson-angular-aws-customer App', function() {
  let page: AngularAwsCustomerPage;

  beforeEach(() => {
    page = new AngularAwsCustomerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
