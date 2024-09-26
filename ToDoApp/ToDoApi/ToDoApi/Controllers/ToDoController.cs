using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using ToDoApi.Data;
using ToDoApi.DTO;
using ToDoApi.Interface;
using ToDoApi.Models;

namespace ToDoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoController : ControllerBase
    {
        private readonly DataContext context;
        private readonly ITodo todo;

        public ToDoController(DataContext context,ITodo todo)
        {
            this.context = context;
            this.todo = todo;
        }
        [HttpGet]
        public  Task<IEnumerable<ToDo>> GetAllToDo()
        {
            return todo.GetTodo();
        }
        [HttpPost]
        public Task<TodoDto> Create(TodoDto todoDto)
        {
            return todo.CreateTodo(todoDto);
        }
        [HttpPut]

        public Task<TodoDto> Update(ToDo todoUpdate) 
        {
            return todo.UpdateTodo(todoUpdate);
        }
        [HttpDelete]
        public Task<string> Delete(int id) 
        {
            return todo.DeleteTodo(id);   
        }
    }
}
