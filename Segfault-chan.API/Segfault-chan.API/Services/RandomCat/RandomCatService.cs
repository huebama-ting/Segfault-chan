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
        private readonly string _apiKey;

        public RandomCatService(IConfiguration configuration, HttpClient httpClient)
        {
            _configuration = configuration;
            _httpClient = httpClient;
            _apiKey = _configuration["RandomCat:ApiKey"];
        }

        public async Task<RandomCatResponse> GetRandomCatImage()
        {
            var request = new HttpRequestMessage(HttpMethod.Get, _configuration["RandomCat:BaseUrl"]);
            request.Headers.Add("x-api-key", _apiKey);
            var response = await _httpClient.SendAsync(request);
            var file = await response.Content.ReadAsStringAsync();

            var urls = JsonSerializer.Deserialize<List<RandomCatResponse>>(file, new JsonSerializerOptions()
            {
                PropertyNameCaseInsensitive = true
            });

            return urls[0];
        }
    }
}

#nullable restore
