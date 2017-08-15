describe('orelse front end up and running', function() {
  it('should be up and running', function() {
    browser.get('http://localhost:4200');
  });
  
  it('should have an input field somewhere', function(){
    var inputExists = element(by.xpath('//*[@id="md-input-1"]'));  
    expect(inputExists.isPresent()).toBe(true);
  });
  
  it('should have a submit button', function(){
    var submitExists = element(by.xpath('/html/body/app-root/div/ng-component/div[5]/div/div[2]/button/span'));
    expect(submitExists.isPresent()).toBe(true);
  });
 
});

