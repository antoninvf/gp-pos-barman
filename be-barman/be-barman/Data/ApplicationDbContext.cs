using be_barman.Entities;
using Microsoft.EntityFrameworkCore;

namespace be_barman.Data;

public class ApplicationDbContext : DbContext
{
    public DbSet<FoodQueueEntity> FoodQueueEntities { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<FoodQueueEntity>().HasKey(x => x.UUID);
    }
}