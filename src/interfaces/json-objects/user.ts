export default interface User {
  data: {
    User: {
      name: string,
      id: number,
      about: string,
      avatar: {
        medium: string
      },
      statistics: {
        anime: {
          count: number,
          episodesWatched: number,
          minutesWatched: number,
          meanScore: number
        },
        manga: {
          count: number,
          chaptersRead: number,
          volumesRead: number,
          meanScore: number
        }
      }
    }
  }
}