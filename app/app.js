var app = angular.module('myApp', []);

app.controller('myController', function($scope){
    $scope.message ='Hello AngularJs'
    $scope.submessage="welcome to angular js learning"
    $scope.name="ashish"
});
app.directive("headerDirective",function(){
    return{
        template: "<h1>Working fine</h1>"
    }
})