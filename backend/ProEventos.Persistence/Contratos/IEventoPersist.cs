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
        Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes); // buscar eventos por tema
        Task<Evento[]> GetAllEventosAsync(bool includePalestrantes); // busca todos os eventos
        Task<Evento> GetAllEventoByIdAsync(int EventoId, bool includePalestrantes); // busca eventos por ID
    }
}