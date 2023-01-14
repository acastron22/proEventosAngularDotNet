using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Persistence
{
    public interface IProEventosPersistence
    {
        // GERAL - TODO E QUALQUER C.R.U.D QUE TIVER Q SALVAR SERÁ FEITO COM ESSES MÉTODOS AQUI
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        void DeleteRange<T>(T[] entity) where T : class;

        Task<bool> SaveChangesAsync();

        //Eventos
        Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes); // buscar eventos por tema
        Task<Evento[]> GetAllEventosAsync(bool includePalestrantes); // busca todos os eventos
        Task<Evento> GetAllEventoByIdAsync(int EventoId, bool includePalestrantes); // busca eventos por ID

        // PALESTRANTES
        Task<Palestrante[]> GetAllPalestrantesByNomeAsync(string Nome, bool includeEventos); // buscar Palestrantes por tema
        Task<Palestrante[]> GetAllPalestrantesAsync(bool includeEventos); // busca todos os Palestrantes
        Task<Palestrante> GetAllPalestranteByIdAsync(int EventoId, bool includeEventos); // busca Palestrantes por ID
    }
}