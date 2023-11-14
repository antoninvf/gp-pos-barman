using be_barman.Entities;
using Microsoft.EntityFrameworkCore;

namespace be_barman.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
        Database.Migrate();
    }

    public DbSet<KitchenQueueEntity> KitchenQueueEntities { get; set; }
    public DbSet<ProductEntity> ProductEntities { get; set; }
    public DbSet<TableEntity> TableEntities { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<KitchenQueueEntity>().HasKey(x => x.UUID);
        modelBuilder.Entity<ProductEntity>().HasKey(x => x.UUID);
        modelBuilder.Entity<TableEntity>().HasKey(x => x.ID);
    }
}