// import { uuid } from 'uuidv4';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
} from 'typeorm';

/**
 *Entity funciona como um decorator, passando a classe como parâmetro,
 poderia também ser algo como Entity(Appointment) ao final da clase no export
 */
@Entity('user_tokens')
class UserToken {
  // Precisamos sinalizar se os atributos da classe são colunas e quais tipos
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('')
  @Generated('uuid')
  token: string;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserToken;
