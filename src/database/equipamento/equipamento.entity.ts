import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Componente } from '../componente/componente.entity';

@Entity()
export class Equipamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @ManyToMany(() => Componente, componente => componente.equipamentos)
  @JoinTable({
    name: 'componenteToEquipamento',
    joinColumn: { name: 'componente_id', referencedColumnName: 'id' }, 
    inverseJoinColumn: { name: 'equipamento_id', referencedColumnName: 'id' }, 
  })
  componentes: Componente[];
}
