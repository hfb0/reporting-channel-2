import { container } from 'tsyringe';

import IComplaintRepository from '../../complaints/repository/complaint-repository.interface';
import ComplaintRepository from '../../complaints/repository/complaint.repository';

import IUserRepository from '../../users/repository/user-repository.interface';
import UserRepository from '../../users/repository/user.repository';
import '../../users/provider';

container.registerSingleton<IComplaintRepository>(
  'ComplaintRepository',
  ComplaintRepository,
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
