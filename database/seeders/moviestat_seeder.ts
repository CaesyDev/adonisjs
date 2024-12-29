import MovieStatuses from '#enums/movie_statuses';
import MovieStatus from '#models/movie_status'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await MovieStatus.createMany([
      {
        name : "Writing",
        id : MovieStatuses.WRITING
      },
      {
        name : "Casting",
        id : MovieStatuses.CASTING
      },
      {
        name : "Production",
        id : MovieStatuses.PRODUCTION
      },
      {
        name : "Post Production",
        id : MovieStatuses.POST_PRODUCTION
      },
      {
        name : "Released",
        id : MovieStatuses.RELEASED
      }
    ]);
  }
}