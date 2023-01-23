using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProEventos.Application.Dtos;
using ProEventos.Domain;

namespace ProEventos.Application.Contratos
{
    public interface IEventoService
    {
        Task<EventoDto> AddEventos(EventoDto model);
        Task<EventoDto> UpdateEvento(int eventoId, EventoDto model);
        Task<bool> DeleteEvento(int eventoId);
        Task<EventoDto[]> GetAllEventosAsync(bool includePalestrantes = false); // busca todos os eventos
        Task<EventoDto[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes = false); // buscar eventos por tema
        Task<EventoDto> GetEventoByIdAsync(int eventoId, bool includePalestrantes = false); // busca eventos por ID
    }
}