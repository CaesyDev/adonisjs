
export default class Movie {
  declare id: number

  declare title: string

  declare slug: string

  greet(message: string){
    console.log(message)
  }
}