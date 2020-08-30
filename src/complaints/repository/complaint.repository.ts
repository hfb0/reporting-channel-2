import { getRepository, Repository } from 'typeorm';
import Complaint from '../complaint.entity';
import CreateComplaintDTO from '../dto/create-complaint.dto';
import IComplaintRepository from './complaint-repository.interface';

class ComplaintRepository implements IComplaintRepository {
  private ormRepository: Repository<Complaint>;

  constructor() {
    this.ormRepository = getRepository(Complaint);
  }

  async create(
    createCreateComplaintDTO: CreateComplaintDTO,
  ): Promise<Complaint> {
    const complaint = this.ormRepository.create(createCreateComplaintDTO);
    await this.ormRepository.save(complaint);

    return complaint;
  }

  async findById(id: string): Promise<Complaint | undefined> {
    const complaint = this.ormRepository.findOne(id);

    return complaint;
  }

  async findByUserId(userId: string): Promise<Complaint[]> {
    const complaints = this.ormRepository.find({ userId });

    return complaints;
  }
}

export default ComplaintRepository;
