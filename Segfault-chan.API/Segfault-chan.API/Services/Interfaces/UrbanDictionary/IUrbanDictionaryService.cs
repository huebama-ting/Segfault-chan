using Segfault_chan.API.Responses.UrbanDictionary;

namespace Segfault_chan.API.Services.Interfaces.UrbanDictionary
{
    public interface IUrbanDictionaryService
    {
        Task<IEnumerable<UrbanDictionaryDefinition>> GetDefinitions(string term);
    }
}
