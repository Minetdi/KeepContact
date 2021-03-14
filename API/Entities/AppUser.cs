namespace API.Entities
{
    public class AppUser
    {
        //L'Id de lutilisateur
        public int Id { get; set; }
        // Le nom de l'Utilisateur
        public string NomUtilisateur { get; set; }
        public byte[] MotdePasseHash { get; set; }
        public byte[] PasswordSalt {get; set;}
    }
}