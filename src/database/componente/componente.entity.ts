import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Categoria } from '../categoria/categoria.entity';
import { Equipamento } from '../equipamento/equipamento.entity';

@Entity()
export class Componente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @ManyToOne(() => Categoria, (categoria) => categoria.componentes)
  categoria: Categoria;

  @OneToMany(() => Equipamento, (equipamento) => equipamento.componentes)
  equipamentos: Equipamento[];
}
