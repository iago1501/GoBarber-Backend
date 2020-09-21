interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'iago1501@gmail.com', // email configurado em address na AWS SES
      name: 'Iago Espinoza',
    },
  },
} as IMailConfig;
