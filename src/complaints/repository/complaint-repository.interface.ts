import Complaint from '../complaint.entity';
import CreateComplaintDTO from '../dto/create-complaint.dto';

interface IComplaintRepository {
  create(createCreateComplaintDTO: CreateComplaintDTO): Promise<Complaint>;
  findById(id: string): Promise<Complaint | undefined>;
  findByUserId(userId: string): Promise<Complaint[]>;
}

export default IComplaintRepository;
