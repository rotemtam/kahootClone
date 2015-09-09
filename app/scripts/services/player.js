'use strict';

/**
 * @ngdoc service
 * @name kahootCloneApp.Player
 * @description
 * # Player
 * Service in the kahootCloneApp.
 */
angular.module('kahootCloneApp')
  .service('Player', function (fbutil, _, $cookieStore) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var self = this, _so;

    self.getUniqId = function() {
    	// generate a unique idenftifier for the player and save it in a cookie to allow refreshes
    	if($cookieStore.get('playerId')) {
    		return self._id = $cookieStore.get('playerId');
    	} else {
    		$cookieStore.put('playerId', _.random(0,999999999)) ;
    		return self._id = $cookieStore.get('playerId');
    	}
    };

    self._connect = function() {
    	// common function between self.join, and self.init
    	// creates a connection to firebase backend 
		self.syncObject = fbutil.syncObject('games/' + self.PIN);
    	_so = self.syncObject;
    	return _so.$loaded()    	
    }

    self.join = function(PIN, screenName) {
    	// register this user to a specific game (identified by PIN)
    	self.PIN = PIN;
    	self.screenName = screenName;
    	return self._connect(PIN)
    	.then(function() {
            // if a /users  node doesn't exist yet, create it
    		if(! _so.data.hasOwnProperty('users')) {
    			_so.data.users = {};
    		}

            // register this players info on the /users node
            // so host and other players are aware of them
    		_so.data.users[self.getUniqId()] = {
    			screen_name : screenName
    		};
    		return _so.$save();
    	});

    };

    self.init = function(PIN) {
        // get unique id from cookie store and connect to backend
		self.getUniqId();
		self.PIN = PIN;
		return self._connect()
    };

    self.saveSelfAttr = function(attr, val) {
        _so.data.users[self._id][attr] = val;
        return _so.$save();
    }

  });
