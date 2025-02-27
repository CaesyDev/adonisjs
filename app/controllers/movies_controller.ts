import type { HttpContext } from '@adonisjs/core/http';
import MovieService from '#services/movie_service';
import UserService from '#services/user_service';
import Movie from '#models/movie';
import cache from '#services/cache_service';
import redisCache from '#services/rediscache_service';
import MovieVm from '#view_models/movie';
import User from '#models/user';
// import db from '@adonisjs/lucid/services/db'

export default class MoviesController {


  async lazy({response} : HttpContext){
    const user = await User.find(1);
    // await user?.load('profile');
    const b = user?.serialize()
    response.json({
      user, b
    });
  }

  async queryScope({response} : HttpContext) {
    const movies: Movie[] = await Movie.query().withScopes(scope => scope.released());
    return response.json(movies);
  }

  async showMovies({view, auth} : HttpContext) {
    const movies: Movie[] = await Movie.all();

    // const data = await db.knexRawQuery("SELECT * FROM users");
    // return data;
    await auth.check();
    return view.render("pages/movies", {movies});
  }

  async singleMovie({view, params} : HttpContext) {
    const slug = params.slug;
    const movie = await Movie.findBy("slug", slug);
    
    return view.render("pages/movie", { movie});
  }

  async index({view, params}: HttpContext) {
    const id = params.id;
    console.log(id);
    view.share({name : "Howell"});
    return view.render('pages/movie');
  }

  async jsonView({response} : HttpContext) {
    const movies: Movie[] = [];
    const newMovie: MovieVm = new MovieVm();

    const cacheDataMemory = cache.get("test-movie");
    console.log(cacheDataMemory);
    const cacheData = await redisCache.get("test-movie");
    console.log(`Cached data: ${cacheData}`);
    if(cacheData){
      console.log("cache hit");
      movies.push(cacheData);
    }else{
      newMovie.id = 1;
      newMovie.title = "Test Movie";
      newMovie.slug = "test-movie";
      movies.push(newMovie);
      // cache.set("test-movie", newMovie);
      await redisCache.set("test-movie", newMovie);
    }
    
    // newMovie.greet("hello world");

    return response.json({
      movies : await MovieService.getMovies(),
      users : await UserService.fetchUsers(),
      movie : movies
  });
  }


  async cacheTest({response} : HttpContext){
    const cached = await redisCache.get("test-movie");
    return response.json({
      cached : cached
    });
  }

  deleteTest({response} : HttpContext){
    console.log("delete test")
    //go back to previous page
    return response.redirect().back();
  }


}