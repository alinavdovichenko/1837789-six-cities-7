export const CreateUpdateOfferMessage = {
  title: {
    minLength: 'Min length for title path is 10',
    maxLength: 'Max length for title path is 100',
  },
  description: {
    minLength: 'Min length for description path is 20',
    maxLength: 'Max length for description path is 1024',
  },
  publicDate: {
    invalidFormat: 'PublicDate must be a valid ISO date',
  },
  city: {
    name: {
      minLength: 'Min length for description path is 1',
      maxLength: 'Max length for description path is 100',
      invalidFormat: 'City must be one of: Paris, Cologne, Brussels, Amsterdam, Hamburg, Dusseldorf',
    },
    invalidLocation: 'Location must be a location type',
  },
  previewImage: {
    isUrl: 'PreviewImage must be a valid URL',
    matches: 'The image must include an extension.jpg or .png',
  },
  images: {
    invalidFormat: 'Images must be an array',
    ArrayMinSize: 'Images must contain exactly 6 images',
    ArrayMaxSize: 'Images must contain exactly 6 images',
  },
  isPremium: {
    invalidFormat: 'isPremium must be an boolean',
  },
  isFavorite: {
    invalidFormat: 'isFavorite must be an boolean',
  },
  type: {
    invalidFormat: 'type must be apartment, house, room or hotel',
  },
  room: {
    invalidFormat: 'Room must be an integer',
    minValue: 'Min length for room path is 1',
    maxValue: 'Max length for room path is 8',
  },
  bedroom: {
    invalidFormat: 'Bedroom must be an integer',
    minValue: 'Min length for bedroom path is 1',
    maxValue: 'Max length for bedroom path is 10',
  },
  price: {
    invalidFormat: 'Price must be an integer',
    minValue: 'Min length for price path is 100',
    maxValue: 'Max length for price path is 100000',
  },
  goods: {
    invalidFormat: 'Field goods must be an array and type must be Breakfast, Air conditioning, Laptop friendly workspace, Baby seat, Washer, Towels or Fridge',
  },
  hostId: {
    invalidId: 'HostId field must be a valid id',
  },
  location: {
    invalidLatitude: 'Latitude must be a valid number',
    invalidLongitude: 'Longitude must be a valid number',
  },
} as const;
