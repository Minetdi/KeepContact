using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class InscriptionDTO
    {
        // Nom d'utilsateur requis
        [Required]
        public string NomUtilisateur {get; set; }

        // Mot de passe requis
        [Required]
        public string MotdePasse { get; set; }

    }
}