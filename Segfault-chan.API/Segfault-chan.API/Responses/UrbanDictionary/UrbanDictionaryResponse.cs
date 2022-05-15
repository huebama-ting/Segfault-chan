#nullable disable

using System.Text.Json.Serialization;

namespace Segfault_chan.API.Responses.UrbanDictionary
{
    public class UrbanDictionaryResponse
    {
        [JsonPropertyName("list")]
        public List<UrbanDictionaryDefinition> Definitions { get; set; }
    }

    public class UrbanDictionaryDefinition
    {
        [JsonPropertyName("definition")]
        public string Definition { get; set; }
        [JsonPropertyName("author")]
        public string Author { get; set; }
        [JsonPropertyName("example")]
        public string Example { get; set; }
        [JsonPropertyName("written_on")]
        public DateTime WrittenOn { get; set; }
        [JsonPropertyName("permalink")]
        public string Permalink { get; set; }
        [JsonPropertyName("thumbs_up")]
        public int ThumbsUp { get; set; }
        [JsonPropertyName("thumbs_down")]
        public int ThumbsDown { get; set; }
    }
}

#nullable restore
