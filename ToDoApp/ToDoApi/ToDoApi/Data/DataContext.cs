using Microsoft.EntityFrameworkCore;
using ToDoApi.Models;

namespace ToDoApi.Data
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions<DataContext> options):base(options) { }
    
        public DbSet<ToDo> todo { get; set; }
    }
}
