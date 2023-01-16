using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Persistence.Contratos
{
    public interface IPalestrantePersist
    {
        // PALESTRANTES
        Task<Palestrante[]> GetAllPalestrantesByNomeAsync(string nome, bool includeEventos); // buscar Palestrantes por tema
        Task<Palestrante[]> GetAllPalestrantesAsync(bool includeEventos); // busca todos os Palestrantes
        Task<Palestrante> GetAllPalestranteByIdAsync(int palestranteId, bool includeEventos); // busca Palestrantes por ID
    }
}