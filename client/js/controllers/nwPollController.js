angular.module("MiracleMorning").controller("nwPollController", ['$scope', '$http', '$location', function($scope, $http, $location) {
    $scope.options = null;
    $scope.title = null;
    Array.prototype.contains = function(v) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === v) return true;
    }
    return false;
}

Array.prototype.unique = function() {
    var arr = [];
    for(var i = 0; i < this.length; i++) {
        if(!arr.contains(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr; 
}

    $scope.submit = function() {
        var options = $scope.options.match(/[^\r\n]+/g).unique();
        if(options.length === 0){
            alert("Please add at least one option!");
        } else {
        $http.post('/newPoll', {
            labels: options,
            title: $scope.title
        }).then(function(res) {
            $scope.options = null;
            $scope.title = null;
            var path = "/poll/" + res.data.id;
            $location.path(path)
        }, function(res) {
            $scope.options = null;
            $scope.title = null;
            alert(res.data.error);
        });
    }
    }
}]);