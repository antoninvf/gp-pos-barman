using be_barman.Data;
using dotenv.net;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

var AllowSpecificOrigins = "CorsPolicy";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowSpecificOrigins,
        policy => { policy.AllowAnyOrigin(); });
});

// Add services to the container.
builder.Services.AddControllers()
    .AddNewtonsoftJson();

DotEnv.Load(options: new DotEnvOptions(envFilePaths: new[] { ".env" }));

MySqlServerVersion version = new MySqlServerVersion(new Version(int.Parse(DotEnv.Read()["DB_VERSION_MAJOR"]), int.Parse(DotEnv.Read()["DB_VERSION_MINOR"]), int.Parse(DotEnv.Read()["DB_VERSION_BUILD"])));
// Set server to host.docker.internal if running in Docker
var dbServer = DotEnv.Read()["DB_SERVER"];
if (Environment.GetEnvironmentVariable("RUNNING_IN_DOCKER") == "true") dbServer = "host.docker.internal";

string connectionString = $"server={dbServer};port={DotEnv.Read()["DB_PORT"]};user={DotEnv.Read()["DB_USER"]};password={DotEnv.Read()["DB_PASSWORD"]};database={DotEnv.Read()["DB_NAME"]}";
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseMySql(connectionString, version, x => x.EnableRetryOnFailure()));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "Barman API", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = @"JWT Authorization header using the Bearer scheme. \r\n\r\n 
                      Enter 'Bearer' [space] and then your token in the text input below.
                      \r\n\r\nExample: 'Bearer 12345abcdef'",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    // Hide endpoints for "/" and "/{url}"
    c.DocInclusionPredicate((_, api) => !string.IsNullOrWhiteSpace(api.RelativePath));
});

var app = builder.Build();

// Swagger is required for zodios and openapi
app.UseSwagger();
app.UseSwaggerUI();

app.UseCors(AllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();