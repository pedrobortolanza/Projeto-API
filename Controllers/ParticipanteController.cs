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

        RotasParticipantes.MapGet("/{id}", async (int id, AppDbContext db) =>
        {
            return await db.Participantes.FindAsync(id) is Participante participante ? Results.Ok(participante) : Results.NotFound();
        });

        RotasParticipantes.MapPost("/", async (Participante participante, AppDbContext db) =>
        {
            db.Participantes.Add(participante);
            await db.SaveChangesAsync();

            return Results.Created($"/{participante.Id}", participante);
        });
        
    }
    
}