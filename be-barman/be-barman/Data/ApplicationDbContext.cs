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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // set up primary keys
        modelBuilder.Entity<KitchenQueueEntity>().HasKey(x => x.UUID);
        modelBuilder.Entity<ProductEntity>().HasKey(x => x.ID);
        modelBuilder.Entity<TableEntity>().HasKey(x => x.ID);
        modelBuilder.Entity<CustomerEntity>().HasKey(x => x.UUID);
        
        // set up auto-incrementing primary keys
        //modelBuilder.Entity<KitchenQueueEntity>().Property(x => x.UUID).ValueGeneratedOnAdd();
        modelBuilder.Entity<TableEntity>().Property(x => x.ID).ValueGeneratedOnAdd();
        
        // set time added to current timestamp
        modelBuilder.Entity<KitchenQueueEntity>().Property(x => x.Timestamp).HasDefaultValueSql("CURRENT_TIMESTAMP");
    }
}