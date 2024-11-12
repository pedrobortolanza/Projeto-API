using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbContext>();
builder.Services.AddCors();



var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(builder => builder
.AllowAnyOrigin()
.AllowAnyHeader()
.AllowAnyMethod()
);

app.UseHttpsRedirection();

app.AddRotasIngressos();
app.AddRotasEventos();
app.AddRotasParticipante();
app.AddRotasLocais();

app.Run();

