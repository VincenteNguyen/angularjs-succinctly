// function myCtrl($scope){
//     $scope.visible = true;

//     $scope.clickMe = function(){
//         $scope.visible = !$scope.visible;
//     }
// }

var app = angular.module("MyApp", []);
// app.controller("MyCtrl", function ($scope) {
//     $scope.name = "Peter";
//     $scope.user = {
//         name: "Parker"
//     };
// });
// app.controller("MyNestedCtrl", function ($scope) {
// });


app.factory("UserService", function () {
    var users = ["Vu", "Quan", "Khoa"];

    return {
        all: function () {
            return users;
        },
        first: function () {
            return users[0];
        }
    }
});

app.controller("MyCtrl", function ($scope, UserService) {
    $scope.users = UserService.all();
});

app.controller("MyNestedCtrl", function ($scope, UserService) {
    $scope.first = UserService.first();
});

app.directive("myWidget", function () {
    var linkFunction = function (scope, element, attributes) {
        var paragrapth = element.children()[0];
        $(paragrapth).on("click", function () {
            $(this).css({ "background-color": "red" });
        })
    };
    return {
        restrict: "E",
        link: linkFunction,
        transclude: true,
        template: "<div ng-transclude><h3>Heading</h3></div>"

    }
});

//Directive Basket
app.directive("basket", function () {
    return {
        restrict: "E",
        controller: function ($scope, $element, $attrs) {
            $scope.content = [];
            this.addApple = function () {
                $scope.content.push("apple");
            };
            this.addOrange = function () {
                $scope.content.push("orange");
            };
        },
        link: function (scope, element) {
            element.bind("mouseenter", function () {
                console.log(scope.content);
            });
        }
    };
});

app.directive("apple", function () {
    return {
        require: "basket",
        link: function (scope, element, attrs, basketCtrl) {
            basketCtrl.addApple();
        }
    };
});
app.directive("orange", function () {
    return {
        require: "basket",
        link: function (scope, element, attrs, basketCtrl) {
            basketCtrl.addOrange();
        }
    };
});

app.filter("reverse", function () {
    return function (input) {
        var result = "";
        input = input || "";
        for (var i = 0; i < input.length; i++) {
            result = input.charAt(i) + result;
        }
        return result;
    };
});


app.filter("reverse2", function(){
    return function(input, options){
        var result = "";
        input = input || "";
        var suffix = options["suffix"] || "";
        for(var i = 0; i < input.length; i++){
            result = input.charAt(i) + result;
        }

        if(input.length > 0)
            result += suffix;
        return result;
    };
});

app.filter("exclude", function(){
    return function(input, exclude){
        var result = [];
        for(var i = 0; i< input.length; i++){
            if(input[i] !== exclude){
                result.push(input[i]);
            }
        }
        return result;
    };
});

app.filter("sortAscending", function(){
    return function(input){
        return input.sort();
    };
});