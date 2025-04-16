import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'prisma/dist';
import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';

@Injectable()
export
    class DatabaseService
    extends PrismaClient
    implements OnModuleDestroy, OnModuleInit {

    async onModuleInit() {
        await this.$connect()
    }

    async onModuleDestroy() {
        await this.$disconnect()
    }
}
