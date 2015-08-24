'use strict';

describe('Service: Trivia', function () {

  // load the service's module
  beforeEach(module('kahootCloneApp'));

  // instantiate service
  var Trivia;
  beforeEach(inject(function (_Trivia_) {
    Trivia = _Trivia_;
  }));

  it('should do something', function () {
    expect(!!Trivia).toBe(true);
  });

});
