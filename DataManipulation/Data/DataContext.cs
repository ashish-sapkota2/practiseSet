using DataManipulation.Models;
using Microsoft.EntityFrameworkCore;

namespace DataManipulation.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Users> Users { get; set; }
        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Users>().Property(u => u.FullName).HasColumnType("nvarchar(255)");
        //    modelBuilder.Entity<Users>().Property(u => u.Caste).HasColumnType("nvarchar(255)");
        //    modelBuilder.Entity<Users>().Property(u => u.Sex).HasColumnType("nvarchar(255)");
        //    modelBuilder.Entity<Users>().Property(u => u.Religion).HasColumnType("nvarchar(255)");
        //    modelBuilder.Entity<Users>().Property(u => u.Education).HasColumnType("nvarchar(255)");
        //    modelBuilder.Entity<Users>().Property(u => u.Occupation).HasColumnType("nvarchar(255)");
        //    modelBuilder.Entity<Users>().Property(u => u.Disability).HasColumnType("nvarchar(255)");
        //}
    }
}
