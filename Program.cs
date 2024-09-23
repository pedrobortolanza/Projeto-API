using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
    new MySqlServerVersion(new Version(8, 0, 21))));


builder.Services.AddControllers();

var app = builder.Build();

app.AddRotasEventos();
app.AddRotasIngressos(); 
app.AddRotasLocais();

app.Run();
