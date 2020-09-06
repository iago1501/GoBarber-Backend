import { EntityRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import Appointment from '../entities/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment>
  implements IAppointmentsRepository {
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.findOne({
      where: { date },
    });
    return findAppointment;
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
