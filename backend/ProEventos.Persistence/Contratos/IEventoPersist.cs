using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Persistence.Contratos
{
    public interface IEventoPersist
    {
        //Eventos
        Task<Evento[]> GetAllEventosByTemaAsync(int userId, string tema, bool includePalestrantes = false); // buscar eventos por tema
        Task<Evento[]> GetAllEventosAsync(int userId, bool includePalestrantes = false); // busca todos os eventos
        Task<Evento> GetEventoByIdAsync(int userId, int eventoId, bool includePalestrantes = false); // busca eventos por ID
    }
}