using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProEventos.API.Models;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventoController : ControllerBase
    {
        public EventoController()
        {

        }

        public IEnumerable<Evento> _evento = new Evento[] {
                new Evento() {
                    EventoId = 1,
                    Tema = "Angular e .NET 5",
                    Local = "Belo Horizonte",
                    Lote = "2º",
                    QtdPessoas = 250,
                    DataEvento = DateTime.Now.AddDays(2).ToString(),
                    ImageUrl = "Evento.jpeg"
                },
                new Evento() {
                    EventoId = 2,
                    Tema = "Angular 15",
                    Local = "Rio de Janeiro",
                    Lote = "1º",
                    QtdPessoas = 350,
                    DataEvento = DateTime.Now.AddDays(15).ToString(),
                    ImageUrl = "Evento.jpeg"
                }
            };

        [HttpGet]
        public IEnumerable<Evento> Get()
        {
            return _evento;
        }
        [HttpGet("{id}")]
        public IEnumerable<Evento> GetById(int id)
        {
            return _evento.Where(evento => evento.EventoId == id);
        }
        
        [HttpPost]
        public string Post()
        {
            return "exemplo de post";
        }
        [HttpPut("{id}")]
        public string Put(int id)
        {
            return $"exemplo de put com id = {id}";
        }
        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            return $"exemplo de Delete com id = {id}";
        }


    }
}
