import User from '#models/user';
import { registerValidator } from '#validators/auth';
import type { HttpContext } from '@adonisjs/core/http'

export default class RegisterController {

    async register({ view }: HttpContext) {
        return view.render("register")
    }

    async store({ response, request, auth }: HttpContext) {
        const data = request.only(['fullName', 'email', 'password']);
        console.log(data);
        const validatedData = await registerValidator.validate(data);
        // const v = await request.validateUsing(registerValidator)
        // console.log(v);

        console.log(`Validated data: ${JSON.stringify(validatedData)}`);
        const user = await User.create({
            fullName : validatedData.fullName,
            email : validatedData.email,
            password : validatedData.password,  
            roleId : 1
        })

        await auth.use('web').login(user)
        return response.redirect().toRoute('home'); 
    }
}