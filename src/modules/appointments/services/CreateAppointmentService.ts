import { startOfHour } from 'date-fns';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  // definindo private antes da variável ele já cria
  //  dentro do contexto da classe e atribui ao this
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  public async execute({ date, provider_id }: IRequest): Promise<Appointment> {
    // Agendamento só pode acontecer de hora em hora (regra de negócio)
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;

// private appointmentsRepository: AppointmentsRepository;

// constructor(appointmentsRepository: AppointmentsRepository) {
//   this.appointmentsRepository = appointmentsRepository;
// }
