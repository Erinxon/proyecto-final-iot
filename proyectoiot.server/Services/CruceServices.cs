using Microsoft.EntityFrameworkCore;
using proyectoiot.server.data;
using proyectoiot.server.models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace proyectoiot.server.Services
{
    public class CruceServices : ICruceServices
    {
        private readonly CruceDbContext cruceDbContext;

        public CruceServices(CruceDbContext cruceDbContext)
        {
            this.cruceDbContext = cruceDbContext;
        }

        public async Task<IEnumerable<Cruce>> GetCruces()
        {
           return await this.cruceDbContext.Cruce.ToListAsync();
        }

        public async Task<int> AddCruce(List<Cruce> cruce)
        {
            await this.cruceDbContext.Cruce.AddRangeAsync(cruce);
            return await this.cruceDbContext.SaveChangesAsync();
        }

        public async Task DeleteData()
        {
            var cruces = await this.GetCruces();
            this.cruceDbContext.Cruce.RemoveRange(cruces);
            await this.cruceDbContext.SaveChangesAsync();
        }
    }
}
