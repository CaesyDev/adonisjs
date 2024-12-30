import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { MovieFactory } from '#database/factories/movie_factory';

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await MovieFactory.createMany(10);
  }
}