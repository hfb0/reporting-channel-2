import MapquestService from './mapquest.service';
import AppError from '../shared/errors/app-error';
import FakeCacheProvider from '../shared/container/provider/cache-provider/fakes/fake-cache.provider';

describe('FindLocation', () => {
  it('should be able to find a location on Mapquest', async () => {
    const fakeCacheProvider = new FakeCacheProvider();
    const mapquestService = new MapquestService(fakeCacheProvider);

    const createAddressDto = await mapquestService.findByGeoCode(
      -9.6638,
      -35.7271,
    );

    expect(createAddressDto.country).toEqual('BR');
    expect(createAddressDto.state).toEqual('Alagoas');
    expect(createAddressDto.city).toEqual('Maceió');
  });

  it('should not be able to find a location without a city', async () => {
    const fakeCacheProvider = new FakeCacheProvider();
    const mapquestService = new MapquestService(fakeCacheProvider);

    expect(mapquestService.findByGeoCode(-1, -2)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
