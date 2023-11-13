using be_barman.Data;
using dotenv.net;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var AllowSpecificOrigins = "CorsPolicy";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowSpecificOrigins,
        policy =>
        {
            policy.AllowAnyOrigin();
        });
});

// Add services to the container.


builder.Services.AddControllers()
    .AddNewtonsoftJson();

DotEnv.Load(options: new DotEnvOptions(envFilePaths: new [] { ".env" }));

MySqlServerVersion version = new MySqlServerVersion(new Version(int.Parse(DotEnv.Read()["DB_VERSION_MAJOR"]), int.Parse(DotEnv.Read()["DB_VERSION_MINOR"]), int.Parse(DotEnv.Read()["DB_VERSION_BUILD"])));
string connectionString = $"server={DotEnv.Read()["DB_SERVER"]};port={DotEnv.Read()["DB_PORT"]};user={DotEnv.Read()["DB_USER"]};password={DotEnv.Read()["DB_PASSWORD"]};database={DotEnv.Read()["DB_NAME"]}";
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseMySql(connectionString, version, x => x.EnableRetryOnFailure()));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Swagger is required for zodios and openapi
app.UseSwagger();
app.UseSwaggerUI();

app.UseCors(AllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();