using Microsoft.EntityFrameworkCore;
using ToDoApi.Data;
using ToDoApi.Interface;
using ToDoApi.Mappings;
using ToDoApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("ToDo"));
});
builder.Services.AddTransient<DapperContext>();
builder.Services.AddAutoMapper(typeof(AutoMapperProfile).Assembly);
builder.Services.AddScoped<ITodo, ToDoRepository>();
builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod()
.AllowCredentials()
.WithOrigins("http://127.0.0.1:5500"));

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
