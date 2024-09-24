using Microsoft.EntityFrameworkCore;

public static class LocaisController
{
    public static void AddRotasLocais(this WebApplication app)
    {
        var rotasLocais = app.MapGroup("/locais");

        rotasLocais.MapGet("/", async (AppDbContext db) =>
        {
            return await db.Locais.ToListAsync();
        });

        rotasLocais.MapGet("/{id}", async (int id, AppDbContext db) =>
        {
            return await db.Locais.FindAsync(id) is Local local ? Results.Ok(local) : Results.NotFound();
        });

        rotasLocais.MapPost("/", async (Local local, AppDbContext db) =>
        {
            db.Locais.Add(local);
            await db.SaveChangesAsync();

            return Results.Created($"/{local.Id}", local);
        });
       
        rotasLocais.MapPut("/{id}", async (int id, Local localAlterado, AppDbContext db) =>
        {
            var local = await db.Locais.FindAsync(id);
            if (local is null) return Results.NotFound();

            local.NomeLocal = localAlterado.NomeLocal;
            local.EnderecoLocal = localAlterado.EnderecoLocal;
            local.CapacidadeLocal = localAlterado.CapacidadeLocal;

            await db.SaveChangesAsync();

            return Results.NoContent();
        });

        rotasLocais.MapDelete("/{id}", async (int id, AppDbContext db) =>
        {
            if (await db.Locais.FindAsync(id) is Local local)
            {
                db.Locais.Remove(local);
                await db.SaveChangesAsync();
                return Results.NoContent();
            }
            return Results.NotFound();
        });
    }
}
