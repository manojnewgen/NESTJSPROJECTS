import { ForbiddenException, Injectable } from "@nestjs/common";
import { User, Bookmark, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable({})
export class AuthService{
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) { }

    async login(dto: AuthDto){
        // find the user by email
        const user = await this.prisma.user.findUnique({
          where: {
            email: dto.email,
          },
        })
        // if user does not exists throw the exception
        if(!user) throw new ForbiddenException('Credentials incorrect');
        // compare password. 
        const pwMatch= await argon.verify(user.password, dto.password)
        // if password is incorrect throw the Exception
        if(!pwMatch) throw new ForbiddenException('Credentials incorrect')

       // delete user.hash;

       // return user;
       return this.signinToken(user.id, user.email)
      }
    async signup(dto: AuthDto){
          //generate the password
          console.log(dto);
        const hash = await argon.hash(dto.password);

        const user = await this.prisma.user.create({
          data: {
            email: dto.email,
            password: hash,
          },
        })

          //return saved user
          return this.signinToken(user.id, user.email)
      }

    async signinToken(userid: number, email: string): Promise<{access_token: string}>
    {
      const payload= {
        sub: userid,
        email
      }
      const secret= this.config.get('JWT_SECRET');

     const token= await this.jwt.signAsync(payload, {
      expiresIn: '15min',
      secret: secret
     });

      return {
        access_token: token
      }
    }


}