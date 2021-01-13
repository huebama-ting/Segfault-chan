export default interface Medium {
  data: {
    Media: {
      title: {
      english?: string,
      romaji: string,
      native: string
      },
      format: string,
      status: string,
      description: string,
      coverImage: {
        medium: string
      },
      genres: string[],
      averageScore: string,
      source: string,
      episodes: string,
      season: string,
      seasonYear: string,
      studios: {
        nodes: [
          name: string
        ]
      },
      chapters: string,
      volumes: string
    }
  }
}
