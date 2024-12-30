import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, scope } from '@adonisjs/lucid/orm'
import MovieStatuses from '#enums/movie_statuses'
import MovieStatus from './movie_status.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Cineast from './cineast.js'

export default class Movie extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare statusId: number

  @column()
  declare writerId: number

  @column()
  declare directorId: number

  @column()
  declare title: string

  @column()
  declare summary: string

  @column()
  declare abstract: string

  @column()
  declare slug: string

  @column()
  declare posterUrl: string

  @column.dateTime()
  declare releasedAt: DateTime | null


  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => MovieStatus, {
    foreignKey : "statusId"
  })
  declare movieStatus: BelongsTo<typeof MovieStatus>


  @belongsTo(() => Cineast, {
    foreignKey : "directorId"
  })
  declare director: BelongsTo<typeof Cineast>

  @belongsTo(() => Cineast, {
    foreignKey : "writerId"
  })
  declare writer: BelongsTo<typeof Cineast>

 



  static released = scope((query) => {
    query.where((group) => {
      group.where("statusId", MovieStatuses.RELEASED)
           .whereNotNull('releasedAt')
           .where('releasedAt', '<=', DateTime.now().toSQL());
    });
  })

  /*  
  SELECT * FROM movies WHERE
    (
      statusId = 5
      AND releasedAt IS NOT NULL
      AND releaseAt <= NOW()
    )
  */

  static emptyPosterUrl = scope((query) => {
    query.where('posterUrl', "").orWhere("posterUrl", " ");
  })
}