import redis from '@adonisjs/redis/services/main';

export class RediscacheService {
  async has(key:string){
    return await redis.exists(key);
  }

  async get(key:string){
    const value = await redis.get(key);
    return value && JSON.parse(value);
  }

  async set(key:string, value:any){
    return await redis.set(key, JSON.stringify(value));
  }

  async delete(key:string){
    return await redis.del(key);
  }
}


const redisCache = new RediscacheService();
export default redisCache;