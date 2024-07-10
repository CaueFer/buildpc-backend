import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule } from './app/users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoriaModule } from './database/categoria/categoria.module';
import { ComponenteModule } from './database/componente/componente.module';
import { EquipamentoModule } from './database/equipamento/equipamento.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        type: 'postgres',
        url: process.env.POSTGRES_URL,
        // host: process.env.POSTGRES_HOST,
        // port: parseInt(process.env.DB_PORT, 10) || 5432,
        // username: process.env.POSTGRES_USER,
        // password: process.env.POSTGRES_PASSWORD,
        // database: process.env.POSTGRES_DATABASE,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    CategoriaModule,
    ComponenteModule,
    EquipamentoModule,
    UsersModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
