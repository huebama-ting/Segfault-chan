using Segfault_chan.API.Responses.UrbanDictionary;

namespace Segfault_chan.API.Services.Interfaces.UrbanDictionary
{
    public interface IUrbanDictionaryService
    {
        Task<UrbanDictionaryResponse> GetDefinitions(string term);
    }
}
