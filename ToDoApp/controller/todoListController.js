window.app.controller('toDoController',function($scope,todoService){

    todoService.getTodos()
    .then(function(response){
        var todos=response.data;
        console.log(todos)
        $scope.todoItems=todos;
    });

    $scope.editItem= function(index){
        // const item = $scope.todoItems[index];
        // var newTitle = prompt("Edit Title:", item.Title);
        // var newContent = prompt("Edit Content:", item.content);
        // if(newTitle!=null && newContent!=null){
        //     item.Title= newTitle;
        //     item.content= newContent
        // }
        $scope.todoItems[index].isEditing=true
    };
    $scope.saveItem=function(index){
        $scope.todoItems[index].isEditing=false
    }

    $scope.deleteItem=function(index){
        todoService.deleteToDo(index);
    }


})

// window.app.controller('toDoController', function($scope,todoService) {
//     $scope.todoItems = [
//         { Title: 'Wake Up', content: 'Wake up at 6:00 A.M' },
//         { Title: 'Shopping', content: 'Take required items from the market' }
//     ];
//     $scope.message = "Hello";
// });

// window.app.controller('GreetingController', ['$scope', function($scope) {
//     $scope.greeting = 'Hola!';
//   }]);
// window.app.controller('GreetingController', ['$scope', function($scope){
//     $scope.message = 'bhola!';
// }]);
// window.app.controller('toDoController', ['$scope', 'todoService', function($scope, todoService) {
//     $scope.todoItems = todoService.getTodos();
//     $scope.message = "Hello";
// }]);