using AutoMapper;
using ToDoApi.Data;
using ToDoApi.Interface;
using ToDoApi.Models;

namespace ToDoApi.Mappings
{
    public class AutoMapperProfile:Profile
    {
        public AutoMapperProfile() {

            CreateMap<ITodo, ToDoRepository>();
        }
    }
}
