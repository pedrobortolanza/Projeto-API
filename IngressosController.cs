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
    }
}