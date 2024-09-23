using Microsoft.EntityFrameworkCore;

public static class ParticipanteController
{
    public static void AddRotasParticipante(this WebApplication app)
    {
        var RotasParticipantes = app.MapGroup("/participantes");

        RotasParticipantes.MapGet("/", async(AppDbContext db) =>
        {
            return await db.Participantes.ToListAsync();
        });

        
    }
    
}