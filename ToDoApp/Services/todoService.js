window.app.factory('todoService',function(){

        
var service={};
    service.todoItems=[{
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

        service.getTodos=function(){
        return service.todoItems;
    },
    service.addTodo=function(newTodo){
        service.todoItems.push(newTodo);
    }
    return service;

})