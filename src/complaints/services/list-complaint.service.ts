import { injectable, inject } from 'tsyringe';
import IComplaintRepository from '../repository/complaint-repository.interface';
import Complaint from '../complaint.entity';

@injectable()
class ListComplaintService {
  constructor(
    @inject('ComplaintRepository')
    private complaintRepository: IComplaintRepository,
  ) {}

  async execute(userId: string): Promise<Complaint[]> {
    const complaints = await this.complaintRepository.findByUserId(userId);

    return complaints;
  }
}

export default ListComplaintService;
