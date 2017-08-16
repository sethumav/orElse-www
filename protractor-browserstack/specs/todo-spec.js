describe('orelse front end up and running', function() {
  var inputExists = element(by.xpath('//*[@id="md-input-1"]')); 
  var submitExists = element(by.xpath('/html/body/app-root/div/ng-component/div[5]/div/div[2]/button/span'));
  
  it('should be up and running', function() {
    browser.get('http://localhost:4200');
  });
  
  it('should have an input field somewhere', function(){
    expect(inputExists.isPresent()).toBe(true);
  });
  
  it('should have a submit button', function(){
    if (expect(submitExists.isPresent()).toBe(true)){
      expect(submitExists.getText()).toBe('Submit');
    }
    
  });
 
});

