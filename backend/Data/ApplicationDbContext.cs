using flwnStatus.Entities;
using Microsoft.EntityFrameworkCore;

namespace flwnStatus.Data;

public class ApplicationDbContext : DbContext
{
    // cdecko -> qrcode, has only one row with the current qrcode data
    public DbSet<StatusEntity> StatusEntities { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<StatusEntity>()
            .HasKey(statusEntity => statusEntity.UUID);
    }
}