# Barman Backend

ASP.Net API for Barman

## Entity Framework Migrations

When there is a new entity model or it gets updated, you need to add a migration and update the database.

### Make sure you are in the correct directory
```bash
cd be-barman
```

### Add Migration
```bash
dotnet ef migrations add <migration_name> # basically a commit message 
dotnet ef database update
```

### Remove Migration
```bash
dotnet ef migrations remove
```