export default class CreateComplaintDTO {
  constructor(
    title: string,
    description: string,
    latitude: number,
    longitude: number,
    userId: string,
  ) {
    this.title = title;
    this.description = description;
    this.latitude = latitude;
    this.longitude = longitude;
    this.userId = userId;
  }

  title: string;

  description: string;

  latitude: number;

  longitude: number;

  postalCode: string;

  country: string;

  state: string;

  city: string;

  neighborhood?: string;

  street?: string;

  userId: string;

  addAddress(
    postalCode: string,
    country: string,
    state: string,
    city: string,
    neighborhood?: string,
    street?: string,
  ): void {
    this.postalCode = postalCode;
    this.country = country;
    this.state = state;
    this.city = city;
    this.neighborhood = neighborhood;
    this.street = street;
  }
}
