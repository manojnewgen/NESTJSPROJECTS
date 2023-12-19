import { Body, Controller, Inject, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { dot } from "node:test/reporters";
import { access } from "fs";

@Controller('auth')
export class AuthController{
  
    constructor(private authService: AuthService){}

    @Post('signin')
    SignIn(@Body() dto: AuthDto){   
     // console.log(dto);
      this.authService.login(dto).then((res)=>{
         console.log(res);
         console.log(`You have successfully logged in with `);
      });
     
    }
    @Post('signup')
    SignUp(@Body() dto: AuthDto){
      console.log(dto)
       return this.authService.signup(dto)
    }


}