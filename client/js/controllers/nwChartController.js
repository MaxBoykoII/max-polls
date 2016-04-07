angular.module('MiracleMorning').controller('nwChartController', ['$scope', '$http', '$location', function($scope, $http, $location) {
    
    $http({
        method: 'GET',
        url: '/charts/' + $scope.id
    }).then(function(res) {

        $scope.title = res.data.title;
        $scope.labels = res.data.labels;
        $scope.data = res.data.data;
        $scope.creator = res.data.creator

    });

    $scope.submit = function(option, exists) {
        $http.put('/charts/' + $scope.id, {
            option: option,
            exists: exists
        }).then(function(res) {
            console.log(res.data);
            $scope.labels = res.data.labels;
            $scope.data = res.data.data;
            $scope.creator = res.data.creator;

            alert("You have voted for " + option + "!");
        }, function(res) {
            alert(res.data.error);
            console.log(res);
        });

    };
    $scope.remove = function() {
        $http.delete('/charts/' + $scope.id).then(function() {
            $location.path("/user");
        }, function() {
            alert("Something went wrong. Please try again!");
        })
    }

}]);