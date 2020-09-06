import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/iCreateAppointmentDTO';

import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });
    return findAppointment;
  }

  public async create({
    date,
    provider_id,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;

// DEPRECATED

// Data Transfer Object

// interface CreateAppointmentDTO {
//   provider: string;
//   date: Date;
// }

// TypeORM já possui
// private appointments: Appointment[];

// constructor() {
//   this.appointments = [];
// }

// public all(): Appointment[] {
//   return this.appointments;
// }

// public create({ provider, date }: CreateAppointmentDTO): Appointment {
//   const appointment = new Appointment({ provider, date });
//   this.appointments.push(appointment);

//   return appointment;
// }

// class AppointmentsRepository extends Repository<Appointment> {
//   public findByDate(date: Date): Appointment | null {
//     const findAppointment = this.appointments.find(appointment =>
//       isEqual(date, appointment.date),
//     );
//     return findAppointment || null;
//   }
// }
