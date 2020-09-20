import { getMongoRepository, MongoRepository } from 'typeorm';

import INotificatonsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notification from '../schemas/Notification';

class NotificationsRepository implements INotificatonsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    // Sempre que fizer uma conexão do banco que não seja a default é
    // necessário passar ela como segundo param do repositório
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      content,
      recipient_id,
    });

    await this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationsRepository;
