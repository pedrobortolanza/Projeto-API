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
    }
}