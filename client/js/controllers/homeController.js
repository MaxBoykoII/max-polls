angular.module('MaxPolls').controller('homeController', ['$scope','$rootScope', '$http', function($scope, $rootScope, $http){
   
   $http.get('/polls').then(function(res){
       $scope.polls = res.data;
   });
    
}])