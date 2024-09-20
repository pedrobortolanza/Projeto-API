using Microsoft.EntityFrameworkCore;

public static class IngressosController
{
    public static void AddRotasIngressos(this WebApplication app)
    {
        app.MapGet("/ingressos", async (AppDbContext db) =>
    await db.Ingresso.ToListAsync());

    }
}