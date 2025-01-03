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
import RegisterController from '#controllers/auth/register_controller';
import LoginController from '#controllers/auth/login_controller';
import { middleware } from './kernel.js';
import LogoutController from '#controllers/auth/logout_controller';

router.get("/", [MoviesController, 'showMovies']).as("home");
router.get("/movie/:slug", [MoviesController, 'singleMovie']).as("movie");
router.get("/movies/:id", [MoviesController, 'index']).as("cool-movie").where('id', router.matchers.slug());
router.get('/json', [MoviesController, 'jsonView']);
router.get('/cache', [MoviesController, 'cacheTest']);
router.delete("/delete", [MoviesController, 'deleteTest']).as("delete");
router.get('/query', [MoviesController, 'queryScope']);
router.get("/lazy", [MoviesController, 'lazy']);

router.group(() => {
    router.get("/register", [RegisterController, 'register']).as("register.name").use(middleware.guest())
    router.post("/register", [RegisterController, 'store']).as("register.store").use(middleware.guest())
    router.get("/login", [LoginController, 'show']).as("login.show").as("login.show").use(middleware.guest())
    router.post("/login", [LoginController, 'store']).as("login.store").as("login.store").use(middleware.guest())
    router.post("/logout", [LogoutController, 'handle']).as("logout").use(middleware.auth())
}).prefix("/auth").as("auth");



router.group(() => {

    router.get("/", (ctx) => {
        return ctx.response.send({ message: "Welcome to the admin panel" });
    }).as("adminhome")

}).prefix("/admin").as("admin").use(middleware.admin());