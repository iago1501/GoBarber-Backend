// import { uuid } from 'uuidv4';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

/**
 *Entity funciona como um decorator, passando a classe como parâmetro,
 poderia também ser algo como Entity(Appointment) ao final da clase no export
 */

/**
 * Um para Um (OneToOne)
 * Um para Muitos (OneToMany)
 * Muitos para Muitos (Many to Many)
 */

@Entity('appointments')
class Appointment {
  // Precisamos sinalizar se os atributos da classe são colunas e quais tipos
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column() // Por default entrará como varchar se não passar params
  provider_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column() // Por default entrará como varchar se não passar params
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Att: constructor não é necessário quando utilizamos typeORM, TypeORM já executa isso

  // Excluir o atributo id da classe appointment
  // constructor({ provider, date }: Omit<Appointment, 'id'>) {
  //   this.id = uuid();
  //   this.provider = provider;
  //   this.date = date;
  // }
}

export default Appointment;
