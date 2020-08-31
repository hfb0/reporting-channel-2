import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateComplaintService from './services/create-complaint.service';
import CreateComplaintDTO from './dto/create-complaint.dto';
import MapquestService from '../mapquest/mapquest.service';

export default class ComplaintController {
  async create(req: Request, res: Response): Promise<Response> {
    const complaintDTO = new CreateComplaintDTO(
      req.body.title,
      req.body.description,
      req.body.latitude,
      req.body.longitude,
      req.user.id,
    );

    const mapquestService = container.resolve(MapquestService);
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
  }
}
