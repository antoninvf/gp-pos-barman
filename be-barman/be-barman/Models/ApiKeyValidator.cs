namespace be_barman.Models;

public class ApiKeyValidator : IApiKeyValidator
{
    public bool IsValid(string apiKey)
    {
        if (Environment.GetEnvironmentVariable("API_KEY") == null) throw new Exception("API_KEY environment variable is not set!");
        return apiKey == Environment.GetEnvironmentVariable("API_KEY");
    }
}

public interface IApiKeyValidator
{
    bool IsValid(string apiKey);
}