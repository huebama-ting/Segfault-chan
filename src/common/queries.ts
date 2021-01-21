/**
 * The GraphQL query to look up an anime
 */
export const animeQuery = `
  query getAnimeByName ($search: String) {
    Media (search: $search, type: ANIME) {
      title {
        english
        romaji
        native
      }
      format
      episodes
      status(version: 2)
      season
      seasonYear
      description
      coverImage {
        medium
      }
      genres
      studios(isMain: true) {
        nodes {
          name
        }
      }
      averageScore
      source(version: 2) 
    }
  }
`;

/**
 * The GraphQL query to look up a manga
 */
export const mangaQuery = `
  query getMangaByName ($search: String) {
    Media (search: $search, type: MANGA, sort: ID) {
      title {
        english
        romaji
        native
      }
      format
      status(version: 2)
      chapters
      volumes
      description
      coverImage {
        medium
      }
      genres
      averageScore
      source(version: 2)
    }
  }
`;

/**
 * The GraphQL query to look up a user
 */
export const aniUserQuery = `
  query getMangaByName ($name: String) {
    User(name: $name, sort: USERNAME) {
      name
      id
      about
      avatar {
        medium
      }
      statistics {
        anime {
          count
          episodesWatched
          minutesWatched
          meanScore
        }
        manga {
          count
          chaptersRead
          volumesRead
          meanScore
        }
      }
    }
  }
`;
