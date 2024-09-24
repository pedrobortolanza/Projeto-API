using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
    public class AppDbContext : DbContext
{
        public AppDbContext(DbContextOptions<AppDbContext> options): base(options){}
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);

        var con = "server=localhost;port=3306;database=eventos;user=root;password=root";
        optionsBuilder.UseMySQL(con).LogTo(Console.WriteLine, LogLevel.Information);
        
    }
        public DbSet<Ingresso> Ingresso => Set<Ingresso>();
        public DbSet<Evento> Evento => Set<Evento>();
        public DbSet<Participante> Participantes => Set<Participante>();
        public DbSet<Local> Locais => Set<Local>();

}

        
        
