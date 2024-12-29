/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import MoviesController from '#controllers/movies_controller';

router.get("/", [MoviesController, 'showMovies']);
router.get("/movie/:slug", [MoviesController, 'singleMovie']).as("movie");
router.get("/movies/:id", [MoviesController, 'index']).as("cool-movie").where('id', router.matchers.slug());
router.get('/json', [MoviesController, 'jsonView']);
router.get('/cache', [MoviesController, 'cacheTest']);
router.delete("/delete", [MoviesController, 'deleteTest']).as("delete");