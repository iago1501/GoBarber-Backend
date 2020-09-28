import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListProviderAppointments from '@modules/appointments/services/ListProviderAppointmentsService';
import { classToClass } from 'class-transformer';

// não podemos enviar body em requisições do tipo get

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.query;

    const createAppointment = container.resolve(ListProviderAppointments);

    const appointments = await createAppointment.execute({
      day: Number(day),
      month: Number(month),
      year: Number(year),
      provider_id,
    });

    return response.json(classToClass(appointments));
  }
}
