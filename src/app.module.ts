import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { CategoriaModule } from "./database/categoria/categoria.module";
import { ComponenteModule } from "./database/componente/componente.module";
import { EquipamentoModule } from "./database/equipamento/equipamento.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        type: "postgres",
        url: process.env.POSTGRES_URL,

        // host: process.env.DB_HOST,
        // username: process.env.DB_USERNAME,
        // password: process.env.DB_PASSWORD,
        // database: process.env.DB_DATABASE,

        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        autoLoadEntities: true,
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
      inject: [ConfigService],
    }),
    CategoriaModule,
    ComponenteModule,
    EquipamentoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
