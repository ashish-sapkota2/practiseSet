using DataManipulation.Data;
using DataManipulation.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DataManipulation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {
        private readonly DataContext context;

        public DataController(DataContext context)
        {
            this.context = context;
        }
        [HttpPost("user")]
        public async Task<IActionResult> CreateUser([FromBody] Users user)
        {
            context.Users.Add(user);
            await context.SaveChangesAsync();
            return Ok(user);
        }

        [HttpGet()]
        public async Task<IActionResult> GetUsers()
        {
            var users = await context.Users.ToListAsync();
            return Ok(users);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await context.Users.FindAsync(id);
            if (user == null) return NotFound();

            context.Users.Remove(user);
            await context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult>UpdateUser(int id, [FromBody] Users updatedUser)
        {
            var user = await context.Users.FindAsync(id);
            if (user == null) return NotFound();

            user.FullName = updatedUser.FullName;
            user.Ward= updatedUser.Ward;
            user.Caste = updatedUser.Caste;
            user.Sex = updatedUser.Sex;
            user.Age = updatedUser.Age;
            user.Religion = updatedUser.Religion;
            user.Education = updatedUser.Education;
            user.Occupation = updatedUser.Occupation;
            user.Disability = updatedUser.Disability;

            await context.SaveChangesAsync();
            return Ok(user);
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchUsers([FromQuery] string? query)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                var allUsers = await context.Users.ToListAsync();
                return Ok(allUsers);
            }
            var users = await context.Users
                .Where(u => EF.Functions.Like(u.FullName, $"%{query}%") ||
                EF.Functions.Like(u.Caste, $"%{query}%") ||
                EF.Functions.Like(u.Sex, $"%{query}%") ||
                EF.Functions.Like(u.Education, $"%{query}%") ||
                EF.Functions.Like(u.Caste, $"%{query}%") ||
                 EF.Functions.Like(u.Disability, $"%{query}%") ||
                EF.Functions.Like(u.Occupation, $"%{query}%"))
                .ToListAsync();
            return Ok(users);
        }
    }
}
