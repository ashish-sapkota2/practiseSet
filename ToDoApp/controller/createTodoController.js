window.app.controller('createtoDoController',function($scope,todoService){

       $scope.todo={
           title:'',
           content:''
       }
       $scope.Add=function(){
        // if($scope.todo.title && $scope.todo.content){
        //     var newTodo={
        //         Title: $scope.todo.title,
        //         content:$scope.todo.content,
        //         done:false,
        //         isEditing:false
        //     };

        //     todoService.addTodo(newTodo)
        //         alert(newTodo.Title+" added in your TODO")
            
        //     $scope.todo.title='';
        //     $scope.todo.content='';
        // }
        var newTodo={
            title:$scope.todo.title,
            content:$scope.todo.content
        };
        todoService.addTodo(newTodo)
        $scope.todo.title='';
            $scope.todo.content='';
    }
})