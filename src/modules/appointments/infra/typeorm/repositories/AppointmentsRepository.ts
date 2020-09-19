import { getRepository, Repository, Raw } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';
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

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0'); // 1 - 01, muito legal

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        // Rawquery é uma query que não vai tentar ser interpretada pelo typeorm,
        // vai ser passada direto pro BD

        // datefieldname é pq o nome nunca vai ser o mesmo do typeORM
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
        ),
      },
    });
    return appointments;
  }

  public async findAllInDayFromProvider({
    provider_id,
    month,
    year,
    day,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0'); // 1 - 01, muito legal
    const parsedDay = String(day).padStart(2, '0'); // 1 - 01, muito legal

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        // Rawquery é uma query que não vai tentar ser interpretada pelo typeorm,
        // vai ser passada direto pro BD

        // datefieldname é pq o nome nunca vai ser o mesmo do typeORM
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
    });
    return appointments;
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
