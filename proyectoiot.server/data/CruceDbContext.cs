using Microsoft.EntityFrameworkCore;
using proyectoiot.server.models;

namespace proyectoiot.server.data
{
    public class CruceDbContext : DbContext
    {
        public CruceDbContext(DbContextOptions<CruceDbContext> options) : base(options)
        {

        }

        public DbSet<Cruce> Cruce { get; set; }
    }
}
