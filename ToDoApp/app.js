var app = angular.module('myApp', ['ngRoute'])
.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/home',{
        templateUrl:'views/createTodo.html',
        controller: 'createtoDoController'
    })
    .when('/todo',{
        templateUrl: 'views/toDoList.html',
        controller:'toDoController'
    })
    .otherwise({
        redirectTo: ''
    });

}])
// var app = angular.module('myApp', ['ngRoute']);
// app.controller('GreetingController', ['$scope', function($scope) {
//     $scope.message = 'Hola!';
//   }])

// app.config(['$routeProvider', function($routeProvider) {
//     $routeProvider
//         .when('/todo', {
//             templateUrl: 'views/toDoList.html',  // Ensure this path is correct
//             // controller: 'GreetingController'
//         })
//         .otherwise({ redirectTo: '/todos' });
// }]);
