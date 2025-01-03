import type { HttpContext } from '@adonisjs/core/http'
import { loginValidator } from '#validators/auth';
import User from '#models/user';

export default class LoginController {
  
  async show({view}: HttpContext) {
    return view.render("login");
  }
  
  async store({request, response}: HttpContext) {
    const {email, password} = await request.validateUsing(loginValidator);
    const user = await User.findBy('email', email);
    // if(user){
    //   if(user.password === )
    // }
    

    return response.redirect().toRoute("home");
  }
  
}