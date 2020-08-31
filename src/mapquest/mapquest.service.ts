import axios from 'axios';
import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import LocationPayload from './interfaces/location-payload.interface';
import ParamsPayload from './interfaces/params-payload.interface';
import GeocodeQuality from './geocode-quality.enum';
import mapQuestConfig from '../config/mapquest.config';
import AppError from '../shared/errors/app-error';
import CreateAddressDto from './dto/create-address.dto';
import ICacheProvider from '../shared/container/provider/cache-provider/cache-provider.interface';

@injectable()
class MapquestService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  private baseURL = 'http://www.mapquestapi.com';

  private badGranularity = [GeocodeQuality.COUNTRY, GeocodeQuality.STATE];

  async findByGeoCode(lat: number, lon: number): Promise<CreateAddressDto> {
    let location = await this.cacheProvider.recover<CreateAddressDto>(
      `mpq-${lat}-${lon}`,
    );

    if (!location) {
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

      location = this.formatDataToAddress(response.data.results[0].locations);

      await this.cacheProvider.save(`mpq-${lat}-${lon}`, location);
    }

    return location;
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
