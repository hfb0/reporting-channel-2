import FakeComplaintRepository from '../repository/fakes/fake-complaint.repository';
import CreateComplaintService from './create-complaint.service';
import CreateComplaintDTO from '../dto/create-complaint.dto';

describe('CreateComplaint', () => {
  it('should be able to create a new complaint', async () => {
    const fakeComplaintRepository = new FakeComplaintRepository();
    const createComplaintService = new CreateComplaintService(
      fakeComplaintRepository,
    );

    const createComplaintDTO = new CreateComplaintDTO(
      'Esgoto a céu aberto',
      'Existe um esgoto a céu aberto nesta localidade.',
      -9.6639,
      -35.7271,
      '1d5a1d5a1d6',
    );

    createComplaintDTO.addAddress(
      '01222000',
      'BR',
      'São Paulo',
      'São Paulo',
      'Vila Buarque',
      'Rua Major Sertório',
    );

    const complaint = await createComplaintService.execute(createComplaintDTO);

    expect(complaint).toHaveProperty('id');
    expect(complaint.userId).toBe('1d5a1d5a1d6');
  });
});
