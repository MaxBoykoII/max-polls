angular.module('MaxPolls').controller("navController", ['$scope', '$rootScope', 'Authenticate', '$location', '$modal', '$http', function($scope, $rootScope, Authenticate, $location, $modal, $http) {

    // [1] function to check if user is authenticated
    $scope.isLoggedIn = function() {
        if ($rootScope.user === undefined) {
            return false;
        }
        else if ($rootScope.user === true) {

            return true;
        }
        else {
            return false;
        }

    };
    // [2] function to logout user
    $scope.logout = function() {
        Authenticate.logout()
            .then(function() {
                $location.path('/');
                console.log(Authenticate.isLoggedIn());
            });
    };

    // [3] Initialize modal
    var newPollModal = $modal({
        scope: $scope,
        templateUrl: '/templates/modals/newPollmodal.html',
        show: false
    });


    // [5] Methods associated with modal
    $scope.input = {};
    Array.prototype.contains = function(v) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] === v) return true;
        }
        return false;
    };

    Array.prototype.unique = function() {
        var arr = [];
        for (var i = 0; i < this.length; i++) {
            if (!arr.contains(this[i])) {
                arr.push(this[i]);
            }
        }
        return arr;
    };

    $scope.submit = function() {
        var options = ($scope.input.options === "") ? [] : $scope.input.options.match(/[^\r\n]+/g).unique();
        if (options.length === 0) {
            alert("Please add at least one option!");
        }
        else {
            $http.post('/newPoll', {
                labels: options,
                title: $scope.input.title
            }).then(function(res) {
                $scope.input = {};
                 newPollModal.$promise.then(newPollModal.hide);
                var path = "/poll/" + res.data.id;
                $location.path(path)
            }, function(res) {
                $scope.options = null;
                $scope.title = null;
                alert(res.data.error);
            });
        }
    }

    // [4] Display modal
    $scope.showModal = function() {
        newPollModal.$promise.then(newPollModal.show);
    };


}]);