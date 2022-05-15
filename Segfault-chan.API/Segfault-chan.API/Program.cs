using Segfault_chan.API.Services.Interfaces.RandomCat;
using Segfault_chan.API.Services.Interfaces.UrbanDictionary;
using Segfault_chan.API.Services.RandomCat;
using Segfault_chan.API.Services.UrbanDictionary;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddHttpClient<IUrbanDictionaryService, UrbanDictionaryService>();
builder.Services.AddHttpClient<IRandomCatService, RandomCatService>();
builder.Services.AddSingleton<IUrbanDictionaryService, UrbanDictionaryService>();
builder.Services.AddSingleton<IRandomCatService, RandomCatService>();

var app = builder.Build();

if (builder.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();
app.MapControllers();

app.Run();
