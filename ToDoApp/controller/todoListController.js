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
        console.log(index)
        todoService.getTodoById(index)
        .then(function(response){
            var tododata = response.data[0];
            
            // Find the matching item in the todoItems array
            for (var i = 0; i < $scope.todoItems.length; i++) {
                if ($scope.todoItems[i].id === tododata.id) {
                    // Update the item with the response data
                    $scope.todoItems[i].title = tododata.title;
                    $scope.todoItems[i].content = tododata.content;
                    $scope.todoItems[i].isEditing = true;  // Enable editing mode for this item
                    break;
                }
            }
        })
    };
    $scope.saveItem=function(index){
        var todoItem = $scope.todoItems[index];

        // Call the service to save the updated todo item
        todoService.updateTodo(todoItem)
            .then(function(response) {
                // Once the item is successfully saved, disable editing mode
                $scope.todoItems[index].isEditing = false;
                console.log('Todo item saved successfully');
            })
            .catch(function(error) {
                console.error('Error saving todo item:', error);
            });
    }

    $scope.deleteItem=function(index){
        todoService.deleteToDo(index).then(function () {
            $scope.todoItems = $scope.todoItems.filter(function (item) {
                return item.index !== index;
            });
        });;
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