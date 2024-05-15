import { CityEntity } from '../city/index.js';
import { LocationEntity } from '../location/index.js';
import { Location, City, User, Offer, OfferType } from '../../types/index.js';
import { UserEntity } from '../user/index.js';
import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {
}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps implements Offer {
  @prop({required: true})
  public title: string;

  @prop({required: true, enum: OfferType})
  public type: OfferType;

  @prop({required: true})
  public bedroom: number;

  @prop({required: true, ref: CityEntity})
  public cityId: Ref<CityEntity>;

  public city: City;

  @prop({required: true})
  public description: string;

  @prop({required: true, type: [String]})
  public goods: string[];

  @prop({required: true, ref: UserEntity})
  public hostId: Ref<UserEntity>;

  public host: User;

  @prop({required: true, type: [String]})
  public images: string[];

  @prop({required: true})
  public isFavorite: boolean;

  @prop({required: true})
  public isPremium: boolean;

  @prop({required: true, ref: LocationEntity})
  public locationId: Ref<LocationEntity>;

  public location: Location;

  @prop({required: true})
  public previewImage: string;

  @prop({required: true})
  public price: number;

  @prop({required: true})
  public publicDate: Date;

  @prop({required: true})
  public rating: number;

  @prop({required: true})
  public room: number;

  constructor(
    offerData: Offer,
    cityId: Ref<CityEntity>,
    hostId: Ref<UserEntity>,
    locationId: Ref<LocationEntity>
  ) {
    super();
    this.bedroom = offerData.bedroom;
    this.city = offerData.city;
    this.description = offerData.description;
    this.goods = offerData.goods;
    this.host = offerData.host;
    this.images = offerData.images;
    this.isFavorite = offerData.isFavorite;
    this.isPremium = offerData.isPremium;
    this.location = offerData.location;
    this.previewImage = offerData.previewImage;
    this.price = offerData.price;
    this.publicDate = offerData.publicDate;
    this.rating = offerData.rating;
    this.room = offerData.room;
    this.title = offerData.title;
    this.type = offerData.type;
    this.cityId = cityId;
    this.hostId = hostId;
    this.locationId = locationId;
  }
}

export const OfferModel = getModelForClass(OfferEntity);
