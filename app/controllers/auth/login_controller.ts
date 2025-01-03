import type { HttpContext } from '@adonisjs/core/http'
import { loginValidator } from '#validators/auth';
import User from '#models/user';

export default class LoginController {
  
  async show({view}: HttpContext) {
    return view.render("login");
  }
  
  async store({request, response, auth}: HttpContext) {
    const {email, password,isRememberMe} = await request.validateUsing(loginValidator);
    const user = await User.verifyCredentials(email, password);
    //create session
    await auth.use("web").login(user, isRememberMe)
    return response.redirect().toPath("/");
  }
  
}