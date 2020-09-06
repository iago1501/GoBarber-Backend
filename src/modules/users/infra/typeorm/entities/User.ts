// import { uuid } from 'uuidv4';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 *Entity funciona como um decorator, passando a classe como parâmetro,
 poderia também ser algo como Entity(Appointment) ao final da clase no export
 */
@Entity('users')
class User {
  // Precisamos sinalizar se os atributos da classe são colunas e quais tipos
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column() // Por default entrará como varchar se não passar params
  name: string;

  @Column()
  email: string;

  @Column()
  avatar: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
