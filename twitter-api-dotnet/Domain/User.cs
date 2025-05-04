using System;

namespace Domain;

public class User : BaseEntity
{
  public string Id { get; set; } = Guid.NewGuid().ToString();
  public required string Username { get; set; }
  public required string Email { get; set; }
  public required string Password { get; set; }
  public required string FirstName { get; set; }
  public required string LastName { get; set; }
  public required string Website { get; set; }
  public required string Location { get; set; }
  public required string Bio { get; set; }
  public required string BirthDate { get; set; }
}
