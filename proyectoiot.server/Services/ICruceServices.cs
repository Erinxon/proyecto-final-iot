using proyectoiot.server.models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace proyectoiot.server.Services
{
    public interface ICruceServices
    {
        Task<IEnumerable<Cruce>> GetCruces();
        Task<int> AddCruce(List<Cruce> cruce);

        Task DeleteData();
    }
}
