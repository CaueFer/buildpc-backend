import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipamento } from './equipamento.entity';
import { EquipamentoService } from './services/equipamento.service';
import { EquipamentoController } from './controllers/equipamento.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Equipamento])],
  providers: [EquipamentoService],
  controllers: [EquipamentoController],
})
export class EquipamentoModule {}
