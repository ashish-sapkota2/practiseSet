window.app.factory("todoService", function ($http) {
    var baseUrl = "https://localhost:7229/api/todo";
    var service = {};
    service.todoItems = [{}];

    service.getTodos = function () {
        return $http.get(baseUrl);
    },

    service.getTodoById=function(id){
        return $http.get(baseUrl+'/'+id);
    }

    service.addTodo = function (newTodo) {
        // service.todoItems.push(newTodo);
        return $http.post(baseUrl, newTodo).then(function (response) {
            service.todoItems.push(response.data);
            service.newTodo = {};
        });
    };

    service.deleteToDo = function (id) {
        return $http.delete(baseUrl + "/" + id)
    };
    return service;
});
