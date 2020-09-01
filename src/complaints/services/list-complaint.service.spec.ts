import FakeComplaintRepository from '../repository/fakes/fake-complaint.repository';
import CreateComplaintDTO from '../dto/create-complaint.dto';
import ListComplaintService from './list-complaint.service';
import CreateComplaintService from './create-complaint.service';

describe('ListComplaint', () => {
  it('should be able to list the complaints of the user', async () => {
    const fakeComplaintRepository = new FakeComplaintRepository();
    const listComplaintService = new ListComplaintService(
      fakeComplaintRepository,
    );
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

    const createdComplaint = await createComplaintService.execute(
      createComplaintDTO,
    );
    const complaints = await listComplaintService.execute('1d5a1d5a1d6');

    expect(complaints).toEqual([createdComplaint]);
  });
});
