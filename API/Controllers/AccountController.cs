using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;

        // Controller pour gerer un compte
        public AccountController(DataContext context, ITokenService tokenService)
        {
            _tokenService = tokenService;
            _context = context;
        }

        // Permet enregistrer un utilisateur
        [HttpPost("register")]
        public async Task<ActionResult<UtilisateurDTO>> Inscription(InscriptionDTO inscription)
        {

            if (await UtilisateurExiste(inscription.NomUtilisateur)) return BadRequest("Le nom est déjà pris");

            using var hmac = new HMACSHA512();

            var utilisateur = new AppUser
            {

                NomUtilisateur = inscription.NomUtilisateur,
                MotdePasseHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(inscription.MotdePasse)),
                PasswordSalt = hmac.Key

            };

            _context.Utilisateurs.Add(utilisateur);
            await _context.SaveChangesAsync();

            return new UtilisateurDTO {
                NomUtilisateur = utilisateur.NomUtilisateur,
                Token = _tokenService.CreateToken(utilisateur)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UtilisateurDTO>> Connexion(ConnexionDTO connexion)
        {

            var utilisateur = await _context.Utilisateurs
                                    .SingleOrDefaultAsync(x => x.NomUtilisateur == connexion.NomUtilisateur);

            if (utilisateur == null) return Unauthorized("utilsateur invalide");

            using var hmac = new HMACSHA512(utilisateur.PasswordSalt);

            var computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(connexion.MotdePasse));

            for (int i = 0; i < computeHash.Length; i++)
            {

                if ((computeHash[i] != utilisateur.MotdePasseHash[i]) || (computeHash[i] == 0))
                    return Unauthorized("Mot de passe invalide");
            }

            return new UtilisateurDTO {
                NomUtilisateur = utilisateur.NomUtilisateur,
                Token = _tokenService.CreateToken(utilisateur)
            };
        }

        // Vérifie si un utilisateur existe
        private async Task<bool> UtilisateurExiste(string Nomutilisateur)
        {

            return await _context.Utilisateurs.AnyAsync(x => x.NomUtilisateur == Nomutilisateur.ToLower());
        }

    }
}