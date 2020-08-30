import CreateComplaintDTO from '../dto/create-complaint.dto';
import Complaint from '../complaint.entity';
import IComplaintRepository from '../repository/complaint-repository.interface';

class CreateComplaintService {
  constructor(private complaintRepository: IComplaintRepository) {}

  async execute(createComplaintDTO: CreateComplaintDTO): Promise<Complaint> {
    const complaint = await this.complaintRepository.create(createComplaintDTO);

    return complaint;
  }
}

export default CreateComplaintService;
