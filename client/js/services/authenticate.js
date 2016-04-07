angular.module('MiracleMorning').factory("Authenticate", ['$http', '$q', '$rootScope',function AuthenticateFactory($http, $q, $rootScope) {
    var user = false;
 
    function getUserStatus() {
        return $http.get('/status')
            .success(function(data) {
                if (data.status) {
                    user = true;
                    $rootScope.user = true;
                    $rootScope.username = data.user;
                }
                else {
                    user = false;
                    $rootScope.user = false;
                    $rootScope.username = null;
                }
            })

        .error(function(data) {
            user = false;
            $rootScope.user = false;
            $rootScope.username = null;
        });
    }
    
       function isLoggedIn() {
        return user;
    }

    function login(username, password) {

        var deferred = $q.defer();

        $http.post('/login', {
            username: username,
            password: password
        }).then(function(data, status) {
            user = data;
            deferred.resolve();

        }, function(data) {
            user = false;
            deferred.reject();
        });
        return deferred.promise;
    }

    function register(username, password) {

        var deferred = $q.defer();

        $http.post('/register', {
            username: username,
            password: password
        }).then(function(data, status) {
            user = data;
            deferred.resolve();

        }, function(data) {
            user = false;
            deferred.reject();
        });
        return deferred.promise;
    }
    
    function logout() {

  
  var deferred = $q.defer();

 
  $http.get('/logout')

    .success(function (data) {
      user = false;
      $rootScope.user = false;
      $rootScope.username = null;
      deferred.resolve();
    })
    
    .error(function (data) {
      user = false;
      $rootScope.user = false;
      $rootScope.username = null;
      deferred.reject();
    });

  return deferred.promise;

}

    return {
        login: login,
        getUserStatus: getUserStatus,
        register: register,
        logout: logout,
        isLoggedIn: isLoggedIn
    };
}]);