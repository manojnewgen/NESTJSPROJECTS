import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { jwtStrategy } from "./strategy";

@Module({
    imports: [PrismaModule, JwtModule.register({}), ConfigModule.forRoot({isGlobal:true})],
    controllers: [AuthController],
    providers: [AuthService, jwtStrategy]
})
export class AuthModule{
    
}

//export default AuthModule