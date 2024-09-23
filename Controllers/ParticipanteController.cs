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

        RotasParticipantes.MapPut("/{id}", async (int id, Participante ingressoAlterado, AppDbContext db) =>
        {
            var participante = await db.Participantes.FindAsync(id);
            if (participante is null) return Results.NotFound();

            participante.NomeParticipante = ingressoAlterado.NomeParticipante;
            participante.CpfParticipante = ingressoAlterado.CpfParticipante;
            participante.DataEmissao = ingressoAlterado.DataEmissao;

            await db.SaveChangesAsync();

            return Results.NoContent();
        });

        

    }
    
}