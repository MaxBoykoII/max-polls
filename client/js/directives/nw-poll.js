angular.module("MiracleMorning").directive("nwPoll", function(){
    return {
         restrict: "E",
            scope: false,
            templateUrl: "templates/directives/nwPoll.html",
            controller: "nwPollController"
    }
    
})