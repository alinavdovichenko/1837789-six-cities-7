import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { CommandName } from '../../consts.js';
import { Offer } from '../../shared/types/offer.type.js';
import { getErrorMessage, getMongoURI } from '../../shared/helpers/index.js';
import { DefaultUserService, UserModel, UserService } from '../../shared/modules/user/index.js';
import { DefaultOfferService, OfferModel, OfferService } from '../../shared/modules/offer/index.js';
import { DatabaseClient, MongoDatabaseClient } from '../../shared/libs/database-client/index.js';
import { DefaultCityService, CityModel, CityService } from '../../shared/modules/city/index.js';
import { LocationModel, LocationService, DefaultLocationService } from '../../shared/modules/location/index.js';
import { Logger, ConsoleLogger } from '../../shared/libs/logger/index.js';
import { DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from './command.constant.js';

export class ImportCommand implements Command {
  private userService: UserService;
  private locationService: LocationService;
  private cityService: CityService;
  private offerService: OfferService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt: string;

  constructor() {
    this.onImportedOffer = this.onImportedOffer.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.locationService = new DefaultLocationService(this.logger, LocationModel);
    this.cityService = new DefaultCityService(this.logger, CityModel, this.locationService);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  public get name(): string {
    return CommandName.Import;
  }

  private async onImportedOffer(offer: Offer, resolve: () => void) {
    await this.saveOffer(offer);
    resolve();
  }

  private async saveOffer(offer: Offer) {
    const user = await this.userService.findOrCreate({
      ...offer.host,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    const [location, city] = await Promise.all([
      this.locationService.findOrCreate({...offer.location}),
      this.cityService.findOrCreate({...offer.city})
    ]);

    await this.offerService.create({
      title: offer.title,
      description: offer.description,
      publicDate: offer.publicDate,
      cityId: city.id,
      previewImage: offer.previewImage,
      images: offer.images,
      isPremium: offer.isPremium,
      isFavorite: offer.isFavorite,
      rating: offer.price,
      type: offer.type,
      room: offer.room,
      bedroom: offer.bedroom,
      price: offer.price,
      goods: offer.goods,
      hostId: user.id,
      locationId: location.id,
    });
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedOffer);
    fileReader.on('end', this.onCompleteImport);

    try {
      fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(error));
    }
  }
}
