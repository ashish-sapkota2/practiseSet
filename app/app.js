var app = angular.module('myApp', []);

app.controller('myController', ['$scope',function($scope){
    $scope.message ='Hello AngularJs'
    $scope.submessage="welcome to angular js learning"
    $scope.name="ashish"
    $scope.cars=[{
        name:"Ashish",
        floor:4
    },{
        name:'test',
        floor:2
    },
{
    name:"test2",
    floor:3
}]
}]);
app.directive("headerDirective",function(){
    return{
        template: "<h1>Working fine</h1>"
    }
})