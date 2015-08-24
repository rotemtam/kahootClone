'use strict';

/**
 * @ngdoc service
 * @name kahootCloneApp.Host
 * @description
 * # Host
 * Service in the kahootCloneApp.
 */
angular.module('kahootCloneApp')
  .service('Host', function (fbutil) {
    var self = this;

    self.init = function(PIN) {
    	self.syncObject = fbutil.syncObject('games/' + PIN);
    	return self.syncObject.$loaded();
    };

  });
