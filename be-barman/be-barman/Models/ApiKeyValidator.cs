using dotenv.net;

namespace be_barman.Models;

public class ApiKeyValidator : IApiKeyValidator
{
    public bool IsValid(string apiKey)
    {
        DotEnv.Load();
        return apiKey == DotEnv.Read()["API_KEY"];
    }
}

public interface IApiKeyValidator
{
    bool IsValid(string apiKey);
}
