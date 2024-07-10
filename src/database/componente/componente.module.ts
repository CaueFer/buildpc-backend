import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Componente } from './componente.entity';
import { ComponenteService } from './services/componente.service';
import { ComponenteController } from './controllers/componente.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Componente])],
  providers: [ComponenteService],
  controllers: [ComponenteController],
})
export class ComponenteModule {}
