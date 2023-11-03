using flwnStatus;
using flwnStatus.Data;
using flwnStatus.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var MyAllowSpecificOrigins = "CorsPolicy";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy =>
        {
            policy.AllowAnyOrigin();
        });
});


builder.Services.AddControllers()
    .AddNewtonsoftJson();

MySqlServerVersion version = new MySqlServerVersion(new Version(10, 11, 2));
string connectionString = "server=192.168.1.21;user=root;password=Malinajahoda30;database=flwn";
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseMySql(connectionString, version));

var app = builder.Build();

app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();