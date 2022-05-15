#nullable disable

using Segfault_chan.API.Responses.RandomCat;
using Segfault_chan.API.Services.Interfaces.RandomCat;
using System.Text.Json;

namespace Segfault_chan.API.Services.RandomCat
{
    public class RandomCatService : IRandomCatService
    {
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;

        public RandomCatService(IConfiguration configuration, HttpClient httpClient)
        {
            _configuration = configuration;
            _httpClient = httpClient;
        }

        public async Task<RandomCatResponse> GetRandomCatImage()
        {
            var response = await _httpClient.GetAsync(_configuration["RandomCat:BaseUrl"]);
            var file = await response.Content.ReadAsStringAsync();

            return JsonSerializer.Deserialize<RandomCatResponse>(file, new JsonSerializerOptions()
            {
                PropertyNameCaseInsensitive = true
            });
        }
    }
}

#nullable restore
