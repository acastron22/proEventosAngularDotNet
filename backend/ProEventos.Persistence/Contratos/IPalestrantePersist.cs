using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProEventos.Domain;
using ProEventos.Persistence.Models;

namespace ProEventos.Persistence.Contratos
{
    public interface IPalestrantePersist : IGeralPersist
    {
        // PALESTRANTES
        Task<PageList<Palestrante>> GetAllPalestrantesAsync(PageParams pageParams, bool includeEventos = false); // busca todos os Palestrantes
        Task<Palestrante> GetAllPalestranteByUserIdAsync(int userId, bool includeEventos = false); // busca Palestrantes por ID
    }
}