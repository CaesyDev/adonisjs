import { CineastFactory } from '#database/factories/cineast_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await CineastFactory.createMany(20);  
  }
}