using Segfault_chan.API.Responses.RandomCat;

namespace Segfault_chan.API.Services.Interfaces.RandomCat
{
    public interface IRandomCatService
    {
        Task<RandomCatResponse> GetRandomCatImage();
    }
}
