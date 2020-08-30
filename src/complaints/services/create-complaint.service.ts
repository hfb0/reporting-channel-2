import { injectable, inject } from 'tsyringe';
import CreateComplaintDTO from '../dto/create-complaint.dto';
import Complaint from '../complaint.entity';
import IComplaintRepository from '../repository/complaint-repository.interface';

@injectable()
class CreateComplaintService {
  constructor(
    @inject('ComplaintRepository')
    private complaintRepository: IComplaintRepository,
  ) {}

  async execute(createComplaintDTO: CreateComplaintDTO): Promise<Complaint> {
    const complaint = await this.complaintRepository.create(createComplaintDTO);

    return complaint;
  }
}

export default CreateComplaintService;
