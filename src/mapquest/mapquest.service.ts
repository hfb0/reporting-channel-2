import axios from 'axios';
import LocationPayload from './interfaces/location-payload.interface';
import ParamsPayload from './interfaces/params-payload.interface';
import GeocodeQuality from './geocode-quality.enum';
import mapQuestConfig from '../config/mapquest.config';
import AppError from '../shared/errors/app-error';
import CreateAddressDto from './dto/create-address.dto';

class MapquestService {
  private baseURL = 'http://www.mapquestapi.com';

  private badGranularity = [GeocodeQuality.COUNTRY, GeocodeQuality.STATE];

  async findByGeoCode(lat: number, lon: number): Promise<CreateAddressDto> {
    const geoCodePathURL = 'geocoding/v1/reverse';

    const params: ParamsPayload = {
      key: mapQuestConfig.apiKey,
      location: `${lat}, ${lon}`,
      thumbMaps: false,
    };

    const response = await axios.get(geoCodePathURL, {
      baseURL: this.baseURL,
      params,
    });

    return this.formatDataToAddress(response.data.results[0].locations);
  }

  private formatDataToAddress(
    locations: Array<LocationPayload>,
  ): CreateAddressDto {
    this.validateGranularity(locations);

    return locations.map(
      location =>
        new CreateAddressDto(
          location.postalCode,
          location.adminArea1,
          location.adminArea3,
          location.adminArea5,
          location.adminArea6,
          location.street,
        ),
    )[0];
  }

  // Valida se endereço possui pelo menos a cidade
  private validateGranularity(locations: Array<LocationPayload>): void {
    if (locations.length === 0) {
      throw new AppError('Address not found.', 404);
    }

    const bad = this.badGranularity.find(item => {
      return item === locations[0].geocodeQuality;
    });

    if (bad) {
      throw new AppError('The address has high granularity.', 422);
    }
  }
}

export default MapquestService;
