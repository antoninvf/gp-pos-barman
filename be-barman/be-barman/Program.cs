using be_barman.Data;
using be_barman.Models;
using dotenv.net;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

const string allowSpecificOrigins = "CorsPolicy";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: allowSpecificOrigins,
        policy => { policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod(); });
});

// Add services to the container.
builder.Services.AddControllers()
    .AddNewtonsoftJson();

DotEnv.Load(options: new DotEnvOptions(envFilePaths: new[] { ".env" }));

MySqlServerVersion version = new MySqlServerVersion(new Version(int.Parse(DotEnv.Read()["DB_VERSION_MAJOR"]),
    int.Parse(DotEnv.Read()["DB_VERSION_MINOR"]), int.Parse(DotEnv.Read()["DB_VERSION_BUILD"])));
// Set server to host.docker.internal if running in Docker
var dbServer = DotEnv.Read()["DB_SERVER"];
if (Environment.GetEnvironmentVariable("RUNNING_IN_DOCKER") == "true") dbServer = "host.docker.internal";

string connectionString =
    $"server={dbServer};port={DotEnv.Read()["DB_PORT"]};user={DotEnv.Read()["DB_USER"]};password={DotEnv.Read()["DB_PASSWORD"]};database={DotEnv.Read()["DB_NAME"]}";
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(connectionString, version, x => x.EnableRetryOnFailure()));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "Barman API", Version = "v1" });
    c.AddSecurityDefinition("ApiKey", new OpenApiSecurityScheme
    {
        Description = "Header API Key",
        Name = "X-API-Key",
        In = ParameterLocation.Header,
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "ApiKey"
                }
            },
            new string[] { }
        }
    });

    // Hide endpoints for "/" and "/{url}"
    c.DocInclusionPredicate((_, api) => !string.IsNullOrWhiteSpace(api.RelativePath));
});

builder.Services.AddSingleton<ApiKeyAuthorizationFilter>();
builder.Services.AddSingleton<IApiKeyValidator, ApiKeyValidator>();


var app = builder.Build();

// Swagger is required for zodios and openapi
app.UseSwagger(c => { c.RouteTemplate = "api-docs/{documentName}/swagger.json"; });
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/api-docs/v1/swagger.json", "Barman API V1");
    c.RoutePrefix = "api-docs";
});

app.UseStaticFiles();

app.UseCors(allowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

// generate database if it doesn't exist
using (var serviceScope = app.Services.GetService<IServiceScopeFactory>()?.CreateScope())
{
    var context = serviceScope?.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    context?.Database.Migrate();
}

// create a default configuration if it doesn't exist
using (var serviceScope = app.Services.GetService<IServiceScopeFactory>()?.CreateScope())
{
    var context = serviceScope?.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    if (!(context?.ConfigurationEntities).Any())
    {
        context?.ConfigurationEntities.Add(new()
        {
            SettingName = "currency",
            Value = "Kč"
        });
        context?.SaveChanges();
    }
}

// create a default admin user if it doesn't exist
using (var serviceScope = app.Services.GetService<IServiceScopeFactory>()?.CreateScope())
{
    var context = serviceScope?.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    if (!(context?.UserEntities).Any())
    {
        context?.UserEntities.Add(new()
        {
            UUID = Guid.NewGuid().ToString(),
            Username = "admin",
            Password = BCrypt.Net.BCrypt.HashPassword("admin123"),
        });
        context?.SaveChanges();
    }
}

app.Run();