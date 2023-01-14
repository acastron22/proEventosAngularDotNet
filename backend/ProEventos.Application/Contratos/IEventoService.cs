using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Application.Contratos
{
    public interface IEventoService
    {
        Task<Evento> AddEventos(Evento model);
        Task<Evento> UpdateEvento(int eventoId, Evento model);
        Task<bool> DeleteEvento(int eventoId);
        Task<Evento[]> GetAllEventosAsync(bool includePalestrantes = false); // busca todos os eventos
        Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes = false); // buscar eventos por tema
        Task<Evento> GetEventoByIdAsync(int eventoId, bool includePalestrantes = false); // busca eventos por ID
    }
}