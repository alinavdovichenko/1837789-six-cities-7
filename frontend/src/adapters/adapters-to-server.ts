import {UserType} from '../const';
import {CityDTO} from '../dto/city.dto';
import {CreateOfferDTO} from '../dto/create-offer.dto';
import {LocationDTO} from '../dto/location.dto';
import {OfferTypeDTO} from '../dto/offer-type.dto';
import {UpdateOfferDTO} from '../dto/update-offer.dto';
import {UserTypeDTO} from '../dto/user-type.dto';
import {UserDTO} from '../dto/user.dto';
import {City, Location, NewOffer, Offer, User} from '../types/types';

export function adaptLocationToServer(location: Location): LocationDTO {
  return {
    latitude: location.latitude,
    longitude: location.longitude,
  };
}

export function adaptCityToServer(city: City): CityDTO {
  return {
    name: city.name,
    location: adaptLocationToServer(city.location),
  };
}

function adaptUserTypeToServer(userType: UserType): UserTypeDTO {
  switch (userType) {
    case UserType.Regular:
      return UserTypeDTO.usual;
    case UserType.Pro:
      return UserTypeDTO.pro;
    default:
      return UserTypeDTO.usual;
  }
}

export function adaptUserToServer(userData: User): UserDTO {
  return {
    name: userData.name,
    email: userData.email,
    type: adaptUserTypeToServer(userData.type),
    avatarUrl: ''
  };
}

export function adaptNewOfferToServer(offerData: NewOffer): CreateOfferDTO {
  return {
    title: offerData.title,
    description: offerData.description,
    city: adaptCityToServer(offerData.city),
    previewImage: offerData.previewImage,
    isPremium: offerData.isPremium,
    type: offerData.type as OfferTypeDTO,
    room: offerData.bedrooms,
    bedroom: offerData.bedrooms,
    price: offerData.price,
    goods: offerData.goods,
    location: adaptLocationToServer(offerData.location),
    images: offerData.images
  };
}

export function adaptOfferToServer(offerData: Offer): UpdateOfferDTO {
  return {
    id: offerData.id,
    rating: offerData.rating,
    isFavorite: offerData.isFavorite,
    room: offerData.bedrooms,
    previewImage: '',
    images: [],
    price: offerData.price,
    title: offerData.title,
    isPremium: offerData.isPremium,
    city: adaptCityToServer(offerData.city),
    location: adaptLocationToServer(offerData.location),
    type: offerData.type as OfferTypeDTO,
    bedroom: offerData.bedrooms,
    description: offerData.description,
    goods: offerData.goods,
    host: adaptUserToServer(offerData.host),
  };
}
