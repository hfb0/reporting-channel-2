import { uuid } from 'uuidv4';
import Complaint from '../../complaint.entity';
import CreateComplaintDTO from '../../dto/create-complaint.dto';
import IComplaintRepository from '../complaint-repository.interface';

class FakeComplaintRepository implements IComplaintRepository {
  private complaints: Complaint[] = [];

  async create(
    createCreateComplaintDTO: CreateComplaintDTO,
  ): Promise<Complaint> {
    const complaint = new Complaint();
    Object.assign(complaint, { id: uuid() }, createCreateComplaintDTO);

    this.complaints.push(complaint);

    return complaint;
  }

  async findById(id: string): Promise<Complaint | undefined> {
    const findComplaint = this.complaints.find(
      complaint => complaint.id === id,
    );

    return findComplaint;
  }

  async findByUserId(userId: string): Promise<Complaint[]> {
    const findComplaint = this.complaints.filter(
      complaint => complaint.userId === userId,
    );

    return findComplaint;
  }
}

export default FakeComplaintRepository;
