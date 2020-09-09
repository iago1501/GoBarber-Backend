import AppError from '@shared/errors/AppError';
import FakeCreateAppointmentService from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeCreateAppointmentService();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '1233453',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1233453');
  });

  it('should not be able to create two appointments at the same hour', async () => {
    const fakeAppointmentsRepository = new FakeCreateAppointmentService();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2020, 10, 25, 16);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '1233453',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '1233453',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
