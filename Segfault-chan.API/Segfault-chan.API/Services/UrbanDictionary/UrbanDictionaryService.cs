#nullable disable

using Microsoft.AspNetCore.WebUtilities;
using Segfault_chan.API.Responses.UrbanDictionary;
using Segfault_chan.API.Services.Interfaces.UrbanDictionary;
using System.Text.Json;

namespace Segfault_chan.API.Services.UrbanDictionary
{
    public class UrbanDictionaryService : IUrbanDictionaryService
    {
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;

        public UrbanDictionaryService(IConfiguration configuration, HttpClient httpClient)
        {
            _configuration = configuration;
            _httpClient = httpClient;
        }

        public async Task<UrbanDictionaryResponse> GetDefinitions(string term)
        {
            var query = QueryHelpers.AddQueryString($"{_configuration["UrbanDictionary:BaseUrl"]}/define", "term", term);
            var request = new HttpRequestMessage(HttpMethod.Get, query);
            var response = await _httpClient.SendAsync(request);
            var definitions = await response.Content.ReadAsStringAsync();

            return JsonSerializer.Deserialize<UrbanDictionaryResponse>(definitions);
        }
    }
}

#nullable restore
