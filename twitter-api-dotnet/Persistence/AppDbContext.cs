using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class AppDbContext(DbContextOptions options) : DbContext(options)
{
  public required DbSet<User> Users { get; set; }

  public override int SaveChanges()
  {
    AddTimestamps();
    return base.SaveChanges();
  }

  public async Task<int> SaveChangesAsync()
  {
    AddTimestamps();
    return await base.SaveChangesAsync();
  }


  private void AddTimestamps()
  {
    var entities = ChangeTracker.Entries().Where(x => x.Entity is BaseEntity && (x.State == EntityState.Added || x.State == EntityState.Modified));

    foreach (var entity in entities)
    {
      var now = DateTime.UtcNow;

      if (entity.State == EntityState.Added)
      {
        ((BaseEntity)entity.Entity).CreatedAt = now;
      }
      ((BaseEntity)entity.Entity).UpdatedAt = now;
    }
  }
}
