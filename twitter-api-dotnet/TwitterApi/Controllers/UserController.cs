using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace TwitterApi.Controllers;

public class UserController(AppDbContext context) : BaseController
{
    [HttpGet]
    public async Task<ActionResult<List<User>>> GetUsersAsync()
    {
        var users = await context.Users.ToListAsync();
        return users;
    }


    // public async Task<ActionResult<User>> CreateUser()
    // {
    //     var user = new User
    //     {
    //         Username = "defaultUsername",
    //         Email = "defaultEmail@example.com",
    //         Password = "defaultPassword",
    //         FirstName = "DefaultFirstName",
    //         LastName = "DefaultLastName",
    //         Website = "https://defaultwebsite.com",
    //         Location = "DefaultLocation",
    //         Bio = "DefaultBio",
    //         BirthDate = DateTime.UtcNow.ToString()
    //     };
    // }
}
