(function() {
  'use strict';
  angular.module('simpleLogin', ['firebase', 'firebase.utils', 'firebase.config'])

    // a simple wrapper that rejects the promise
    // if the user does not exists (i.e. makes user required), useful for
    // setting up secure routes that require authentication
    .factory('authRequired', function(simpleLogin, $q) {
      return function() {
        return simpleLogin.auth.$requireAuth().then(function (user) {
          return user ? user : $q.reject({ authRequired: true });
        });
      };
    })

    .factory('simpleLogin', function($firebaseAuth, fbutil, $q, $rootScope) {
      var auth = $firebaseAuth(fbutil.ref());
      var listeners = [];

      function statusChange() {
        fns.initialized = true;
        fns.user = auth.$getAuth() || null;
        angular.forEach(listeners, function(fn) {
          fn(fns.user);
        });
      }

      var fns = {
        auth: auth,

        user: null, //todo use getUser() and remove this var

        initialized: false,

        getUser: function() {
          return auth.$getAuth();
        },

        login: function(provider, opts) {
          return auth.$authWithOAuthPopup(provider, opts);
        },

        anonymousLogin: function(opts) {
          return auth.$authAnonymously(opts);
        },

        passwordLogin: function(creds, opts) {
          return auth.$authWithPassword(creds, opts);
        },

        logout: function() {
          auth.$unauth();
        },

        watch: function(cb, $scope) {
          listeners.push(cb);
          auth.$waitForAuth(cb);
          var unbind = function() {
            var i = listeners.indexOf(cb);
            if( i > -1 ) { listeners.splice(i, 1); }
          };
          if( $scope ) {
            $scope.$on('$destroy', unbind);
          }
          return unbind;
        }
      };

      auth.$onAuth(statusChange);

      return fns;
    });
})();
