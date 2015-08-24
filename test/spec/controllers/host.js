'use strict';

describe('Controller: HostCtrl', function () {

  // load the controller's module
  beforeEach(module('kahootCloneApp'));

  var HostCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HostCtrl = $controller('HostCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
