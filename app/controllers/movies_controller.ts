import type { HttpContext } from '@adonisjs/core/http';
import MovieService from '#services/movie_service';
import UserService from '#services/user_service';
import Movie from '#models/movie';
import cache from '#services/cache_service';

export default class MoviesController {
  async index({view, params}: HttpContext) {
    const id = params.id;
    console.log(id);
    view.share({name : "Howell"});
    return view.render('pages/movie');
  }

  async jsonView({response} : HttpContext) {

    const movies: Movie[] = [];
    const newMovie: Movie = new Movie();

    const cacheData = cache.get("test-movie");
    if(cacheData){
      console.log("cache hit");
    }else{
      newMovie.id = 1;
      newMovie.title = "Test Movie";
      newMovie.slug = "test-movie";
      movies.push(newMovie);
    }
    
    newMovie.greet("hello world");

    return response.json({
      movies : await MovieService.getMovies(),
      users : await UserService.fetchUsers(),
      movie : movies
  });
  }
}