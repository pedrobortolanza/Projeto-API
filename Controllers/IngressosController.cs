using Microsoft.EntityFrameworkCore;

public static class IngressosController
{
    public static void AddRotasIngressos(this WebApplication app)
    {

        var RotasIngressos = app.MapGroup("/ingressos");


        RotasIngressos.MapGet("/", async (AppDbContext db) =>
        {
            return await db.Ingresso.ToListAsync();
        });

        RotasIngressos.MapGet("/{id}", async (int id, AppDbContext db) =>
        {
            return await db.Ingresso.FindAsync(id) is Ingresso ingresso ? Results.Ok(ingresso) : Results.NotFound();
        });

        RotasIngressos.MapPost("/", async (Ingresso ingresso, AppDbContext db) =>
        {
            db.Ingresso.Add(ingresso);
            await db.SaveChangesAsync();

            return Results.Created($"/{ingresso.Id}", ingresso);
        });

        RotasIngressos.MapPut("/{id}", async (int id, Ingresso ingressoAlterado, AppDbContext db) =>
        {
            var ingresso = await db.Ingresso.FindAsync(id);
            if (ingresso is null) return Results.NotFound();

            ingresso.NomeEvento = ingressoAlterado.NomeEvento;
            ingresso.NomeParticipante = ingressoAlterado.NomeParticipante;
            ingresso.DataEmissao = ingressoAlterado.DataEmissao;

            await db.SaveChangesAsync();

            return Results.NoContent();
        });

        RotasIngressos.MapDelete("/{id}", async (int id, AppDbContext db) =>
        {
            if (await db.Ingresso.FindAsync(id) is Ingresso ingresso)
            {

                db.Ingresso.Remove(ingresso);

                await db.SaveChangesAsync();
                return Results.NoContent();
            }
            return Results.NotFound();
        });
    }
}
    