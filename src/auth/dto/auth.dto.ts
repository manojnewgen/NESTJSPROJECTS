// export interface AuthDto{
//     email: string,
//     password: string
// }

import { IsEmail, IsNotEmpty, IsString } from "class-validator"

// with tranformer and class validator of pipes we have to use class instead of interface
export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    password: string;
}