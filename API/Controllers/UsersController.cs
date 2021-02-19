using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;

        public UsersController(DataContext context)
        {
            _context = context;

        }

        // Accès à la Liste des Utilisateurs de manière asynchrone
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUtilisateurs() 
        {                   
            return await _context.Utilisateurs.ToListAsync();
        }

        // Accès à l'utilisateur à travers un Id de manière asynchrone
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUtilisateur(int id) 
        {
            return await _context.Utilisateurs.FindAsync(id);
        }
    }
}