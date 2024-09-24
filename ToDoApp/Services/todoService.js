angular.module('myApp').service('todoService',function(){
    $scope.todoItems=[{
        Title:'wakeUp',
        content:'Wake up at 6:00 A.M',
        done:false,
        isEditing:false
    },{
        Title:'Shopping',
        content:'take required item from the market',
        done:false,
        isEditing:false

    }];

    this.getTodos=function(){
        return todoItems;
    };
    this.addTodo=function(newTodo){
        todoItems.push(newTodo);
    }
})