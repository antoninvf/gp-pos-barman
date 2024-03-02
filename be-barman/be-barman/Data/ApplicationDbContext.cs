using be_barman.Entities;
using Microsoft.EntityFrameworkCore;

namespace be_barman.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
        //Database.Migrate();
    }

    public DbSet<KitchenQueueEntity> KitchenQueueEntities { get; set; }
    public DbSet<ProductEntity> ProductEntities { get; set; }
    public DbSet<TableEntity> TableEntities { get; set; }
    public DbSet<CustomerEntity> CustomerEntities { get; set; }
    public DbSet<OrderEntity> OrderEntities { get; set; }
    public DbSet<UserEntity> UserEntities { get; set; }
    public DbSet<ConfigurationEntity> ConfigurationEntities { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // set up primary keys
        modelBuilder.Entity<KitchenQueueEntity>().HasKey(x => x.ID);
        modelBuilder.Entity<ProductEntity>().HasKey(x => x.ID);
        modelBuilder.Entity<TableEntity>().HasKey(x => x.ID);
        modelBuilder.Entity<CustomerEntity>().HasKey(x => x.UUID);
        modelBuilder.Entity<OrderEntity>().HasKey(x => x.ID);
        modelBuilder.Entity<UserEntity>().HasKey(x => x.UUID);
        modelBuilder.Entity<ConfigurationEntity>().HasKey(x => x.ID);
        
        // set up auto-incrementing primary keys
        //modelBuilder.Entity<KitchenQueueEntity>().Property(x => x.UUID).ValueGeneratedOnAdd();
        modelBuilder.Entity<TableEntity>().Property(x => x.ID).ValueGeneratedOnAdd();
        modelBuilder.Entity<OrderEntity>().Property(x => x.ID).ValueGeneratedOnAdd();
        modelBuilder.Entity<ConfigurationEntity>().Property(x => x.ID).ValueGeneratedOnAdd();
    }
}