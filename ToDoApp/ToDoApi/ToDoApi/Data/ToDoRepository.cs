using Dapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using ToDoApi.DTO;
using ToDoApi.Interface;
using ToDoApi.Models;

namespace ToDoApi.Data
{
    public class ToDoRepository : ITodo
    {
        private readonly DataContext context;
        private readonly DapperContext dapper;

        public ToDoRepository(DataContext context,DapperContext dapper)
        {
            this.context = context;
            this.dapper = dapper;
        }
        public async Task<TodoDto> CreateTodo(TodoDto todo)
        {
            string sql = "insert into todo (Title,Content) values(@title,@content)";
            using (var connection =dapper.CreateConnection())
            {
                var parameter= new {
                    Title=todo.Title,
                    Content=todo.Content,
                    };
                var result = await connection.ExecuteAsync(sql,parameter);
                return new TodoDto{
                    Title=todo.Title,
                    Content=todo.Content,
                };
            }
        }

        public async Task<string> DeleteTodo(int id)
        {
            var sql = "delete  from todo where Id=@Id";
            using (var connection = dapper.CreateConnection())
            {
                var result = await connection.ExecuteAsync(sql,new { Id=id });
                if (result > 0)
                {
                    return "Deleted Successfully";
                }
                else
                {
                    return "Error while deleting ";
                }
            }
        }

        public async Task<IEnumerable<ToDo>> GetTodo()
        {
            string sql = "select * from todo";
            using (var connection = dapper.CreateConnection())
            {
                var result = await connection.QueryAsync<ToDo>(sql);
                return result.ToList();
            }
        }

        public async Task<TodoDto> UpdateTodo(ToDo todoUpdate)
        {
            var sql = "update todo set Title=@Title,Content=@Content where Id=@Id";
            using(var connection =dapper.CreateConnection())
            {
                var parameter = new
                {
                    Title = todoUpdate.Title,
                    Content = todoUpdate.Content,
                    Id = todoUpdate.Id,
                };

                await connection.ExecuteAsync(sql, parameter);
                return new TodoDto 
                {
                    Title=todoUpdate.Title,
                    Content=todoUpdate.Content
                };

            }
        }
    }
}
