import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    // this is constructor of prisma client
    constructor(config: ConfigService) {
        super({
           datasources: {
            db: {
                url: config.get('DATABASE_URL')
            }
           }
        });
        
    }
}
