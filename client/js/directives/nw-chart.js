angular.module('MaxPolls').directive("nwChart", function() {
        return {
            restrict: "E",
            scope: false,
            templateUrl: "templates/directives/nwChart.html",
            controller: "nwChartController",
            link: function(scope, element) {
                element.find(".submit").on("click", function() {
                    var selected = element.find("select option:selected");
                    if (selected.val() === "0") {
                        var custom = element.find("input[name='custom']").val();
                        if ($.inArray(custom, scope.labels) !== -1) {
                            alert("This choice already exists!");
                        }
                        else if (custom === "") {
                            alert("Please upadate your custom choice to include at least one character!");
                        }
                        else {
                            scope.submit(custom, false);
                        }
                    }
                    else {
                        scope.submit(selected.text(), true);
                    }
                });
                element.find("select").change(function() {
                    if ($(this).val() === "0") {
                        element.find(".hideable").toggleClass("hidden");
                    }
                    else if (!element.find(".hideable").hasClass("hidden")) {
                        element.find(".hideable").addClass("hidden");
                    }
                });
            }
        }
    }

);