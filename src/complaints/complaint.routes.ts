import { Router } from 'express';
import { container } from 'tsyringe';
import ensureAuth from '../shared/middlewares/ensure-auth';
import CreateComplaintService from './services/create-complaint.service';
import CreateComplaintDTO from './dto/create-complaint.dto';
import MapquestService from '../mapquest/mapquest.service';

const complaintRouter = Router();

complaintRouter.use(ensureAuth);

complaintRouter.post('/', async (req, res) => {
  const complaintDTO = new CreateComplaintDTO(
    req.body.title,
    req.body.description,
    req.body.latitude,
    req.body.longitude,
    req.user.id,
  );

  const mapquestService = new MapquestService();
  const address = await mapquestService.findByGeoCode(
    complaintDTO.latitude,
    complaintDTO.longitude,
  );

  complaintDTO.addAddress(
    address.postalCode,
    address.country,
    address.state,
    address.city,
    address.neighborhood,
    address.street,
  );

  const createComplaintService = container.resolve(CreateComplaintService);

  const complaint = await createComplaintService.execute(complaintDTO);

  return res.status(201).json(complaint);
});

export default complaintRouter;
