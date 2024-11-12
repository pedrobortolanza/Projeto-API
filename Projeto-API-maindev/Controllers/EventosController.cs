using Microsoft.EntityFrameworkCore;

public static class EventosController
{
    public static void AddRotasEventos(this WebApplication app)
    {

        var RotasEventos = app.MapGroup("/eventos");


        RotasEventos.MapGet("/", async (AppDbContext db) =>
        {
            return await db.Evento.ToListAsync();
        });

        RotasEventos.MapGet("/{id}", async (int id, AppDbContext db) =>
        {
            return await db.Evento.FindAsync(id) is Evento evento ? Results.Ok(evento) : Results.NotFound();
        });

        RotasEventos.MapPost("/", async (Evento evento, AppDbContext db) =>
        {
            db.Evento.Add(evento);
            await db.SaveChangesAsync();

            return Results.Created($"/{evento.Id}", evento);
        });

        RotasEventos.MapPut("/{id}", async (int id, Evento eventoAlterado, AppDbContext db) =>
        {
            var evento = await db.Evento.FindAsync(id);
            if (evento is null) return Results.NotFound();

            evento.NomeEvento = eventoAlterado.NomeEvento;
            evento.LocalEvento = eventoAlterado.LocalEvento;
            evento.DataEvento = eventoAlterado.DataEvento;

            await db.SaveChangesAsync();

            return Results.NoContent();
        });

        RotasEventos.MapDelete("/{id}", async (int id, AppDbContext db) =>
        {
            if (await db.Evento.FindAsync(id) is Evento evento)
            {

                db.Evento.Remove(evento);

                await db.SaveChangesAsync();
                return Results.NoContent();
            }
            return Results.NotFound();
        });
    }
}
    