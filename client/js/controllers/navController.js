angular.module("MiracleMorning").controller("navController", ['$scope', '$rootScope','Authenticate', '$location', function($scope, $rootScope, Authenticate, $location) {
   $scope.isLoggedIn = function(){
          if ($rootScope.user === undefined){
              return false;
          }
          else if ($rootScope.user === true){
        return true; 
          }
          else{
              return false;
          }
        
    }
     $scope.logout = function() {
        Authenticate.logout()
            .then(function() {
                $location.path('/');
                console.log(Authenticate.isLoggedIn());
            });
    }
    

}])