using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Persistence.Contratos
{
    public interface ILotePersist
    {
        /// <summary>
        /// método get que retornará uma lista de lotes por eventoId.
        /// </summary>
        /// <param name="eventoId"> //!Código chave da tabela lote </param>
        /// <param name="id"> Código chave da tabela lote </param>
        /// <returns>Array de Lotes</returns>
        Task<Lote[]> GetLotesByEventoIdAsync(int eventoId);


        /// <summary>
        /// método get que retornara apenas 1 Lote
        /// </summary>
        /// <param name="eventoId"> //!Código chave da tabela lote </param>
        /// <param name="id"> Código chave da tabela lote </param>
        /// <returns>apenas 1 lote</returns>
        Task<Lote> GetLoteByIdsAsync(int eventoId, int id);
    }
}