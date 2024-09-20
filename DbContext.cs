using Microsoft.EntityFrameworkCore;
     public class AppDbContext : DbContext
{
        public AppDbContext(DbContextOptions<AppDbContext> options): base(options){}
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
        
        var con = "server=localhost;port=3306;database=eventos;user=root;password=positivo";
        optionsBuilder.UseMySQL(con);
        
    }
        public DbSet<Ingresso> Ingresso => Set<Ingresso>();

}

