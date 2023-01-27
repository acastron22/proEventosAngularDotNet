using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Application.Dtos
{
    public class EventoDto
    {
        public int Id { get; set; }
        public string Local { get; set; }
        public string DataEvento { get; set; }

        [Required(ErrorMessage = "O Campo {0} é obrigatório."),
        //MinLength(3, ErrorMessage = "O {0} deve ter no mínimo 4 caracteres"),
        //MaxLength(50, ErrorMessage = "O {0} deve ter no máximo 50 caracteres")
        StringLength(50, MinimumLength = 4,
                         ErrorMessage = "{0} deve ter de 4 a 50 caracteres")]
        public string Tema { get; set; }

        [Display(Name = "Quantidade de pessoas")]
        [Range(1, 120000, ErrorMessage = "{0} não pode ser menor que 1 e maior que 120.000")]
        public int QtdPessoas { get; set; }

        [RegularExpression(@".*\.(jpeg|jpg|bmp|png)$",
                            ErrorMessage = "Não é uma imagem válida. (jpg, jpeg, bmp ou png)")]
        public string ImageUrl { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório"),
        Phone(ErrorMessage = "O campo {0} está com número inválido")]
        public string Telefone { get; set; }


        [Required(ErrorMessage = "O campo {0} é obrigatório"),
        Display(Name = "e-mail"),
        EmailAddress(ErrorMessage = "{0} precisa ser válido")]
        public string Email { get; set; }
        public IEnumerable<LoteDto> Lotes { get; set; }
        public IEnumerable<RedeSocialDto> RedesSociais { get; set; }
        public IEnumerable<PalestranteDto> Palestrantes { get; set; }
    }
}