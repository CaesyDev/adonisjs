import Role from '#models/role'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Roles from '#enums/roles'

export default class extends BaseSeeder {
  async run() {
    await Role.createMany([
      {
      name : "User",
      id : Roles.USER
      },
      {
        name : "Admin",
        id : Roles.ADMIN
      }, 
  ])
  }
}