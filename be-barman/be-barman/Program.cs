using System.Collections;
using be_barman.Data;
using be_barman.Models;
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

var dbName = Environment.GetEnvironmentVariable("DB_NAME");
var dbServer = Environment.GetEnvironmentVariable("DB_SERVER");
var dbPort = Environment.GetEnvironmentVariable("DB_PORT");
var dbUser = Environment.GetEnvironmentVariable("DB_USER");
var dbPassword = Environment.GetEnvironmentVariable("DB_PASSWORD");
var dbVersionMajor = Environment.GetEnvironmentVariable("DB_VERSION_MAJOR");
var dbVersionMinor = Environment.GetEnvironmentVariable("DB_VERSION_MINOR");
var dbVersionBuild = Environment.GetEnvironmentVariable("DB_VERSION_BUILD");

if (dbVersionMajor == null || dbVersionMinor == null || dbVersionBuild == null)
{
    throw new Exception("Database version is not set in environment variables!");
}

MySqlServerVersion version = new MySqlServerVersion(new Version(int.Parse(dbVersionMajor),
    int.Parse(dbVersionMinor), int.Parse(dbVersionBuild)));

foreach (DictionaryEntry environmentVariable in Environment.GetEnvironmentVariables())
{
    Console.WriteLine(environmentVariable.Key + " = " + environmentVariable.Value);
}

string connectionString =
    $"server={dbServer};port={dbPort};user={dbUser};password={dbPassword};database={dbName}";
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
        // Default configuration
        context?.ConfigurationEntities.Add(new()
        {
            SettingName = "currency",
            Value = "Kč"
        });
        //context?.ConfigurationEntities.Add(new()
        //{
        //    SettingName = "tax",
        //    Value = "21"
        //});
        context?.ConfigurationEntities.Add(new()
        {
            SettingName = "restaurant_name",
            Value = "The Restaurant Name"
        });
        context?.ConfigurationEntities.Add(new()
        {
            SettingName = "restaurant_address",
            Value = "The Restaurant Address"
        });
        context?.ConfigurationEntities.Add(new()
        {
            SettingName = "restaurant_phone",
            Value = "The Restaurant Phone"
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
            Username = Environment.GetEnvironmentVariable("ADMIN_USERNAME"),
            Password = BCrypt.Net.BCrypt.HashPassword(Environment.GetEnvironmentVariable("ADMIN_PASSWORD"))
        });
        context?.SaveChanges();
    }
    // update the user if it exists and if the password or username is different
    else if (context?.UserEntities.Count() == 1)
    {
        var user = context?.UserEntities.First();
        
        if (user.Username != Environment.GetEnvironmentVariable("ADMIN_USERNAME"))
        {
            user.Username = Environment.GetEnvironmentVariable("ADMIN_USERNAME");
            context?.SaveChanges();
        }

        if (!BCrypt.Net.BCrypt.Verify(Environment.GetEnvironmentVariable("ADMIN_PASSWORD"), user.Password))
        {
            user.Password = BCrypt.Net.BCrypt.HashPassword(Environment.GetEnvironmentVariable("ADMIN_PASSWORD"));
            context?.SaveChanges();
        }
    }
}

app.Run();