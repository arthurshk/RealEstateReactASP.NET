using Microsoft.EntityFrameworkCore;

namespace RealEstateReactASP.NET.Server.Models
{
    public class RealEstateContext : DbContext
    {
        public RealEstateContext(DbContextOptions<RealEstateContext> options) : base(options) { }
        public DbSet<Property> Properties { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
