export default class MovieService {
  
  static async getMovies() {
    return {
      title: 'Inception',
      director: 'Christopher Nolan',
      releaseDate: '2010-07-16',
      rating: 8.8,
      cast: ['Christopher Nolan', 'Brad Pitt', 'Jennifer Lawrence'],
    }
  }
}