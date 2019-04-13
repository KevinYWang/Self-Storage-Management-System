using Microsoft.EntityFrameworkCore;
using Self_Storage_Management_System.Core.Entities;

namespace Self_Storage_Management_System.Core.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Account> Accounts { get; set; }
    }
}