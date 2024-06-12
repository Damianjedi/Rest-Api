using Microsoft.EntityFrameworkCore;
using KebabShop.Models;

namespace KebabShop.Data

{
    public class KebabContext : DbContext
    {
        public KebabContext(DbContextOptions<KebabContext> options) : base(options) { }

        public DbSet<Kebab> Kebabs { get; set; }
    }
}
