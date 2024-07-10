
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Componente } from '../componente/componente.entity';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @OneToMany(() => Componente, componente => componente.categoria)
  componentes: Componente[];
}