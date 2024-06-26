import { ReviewService } from './review-service.interface.js';
import { ReviewEntity } from './review.entity.js';
import { Component, SortType } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { CreateReviewDto } from './index.js';
import { Types } from 'mongoose';

const DEFAULT_REVIEW_COUNT = 50;

@injectable()
export class DefaultReviewService implements ReviewService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.ReviewModel) private readonly reviewModel: types.ModelType<ReviewEntity>,
  ) {
  }

  public async create(dto: CreateReviewDto): Promise<DocumentType<ReviewEntity>> {
    const result = await this.reviewModel.create(dto);
    this.logger.info(`New review with publish date ${result.publishDate} created`);

    return result;
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<ReviewEntity>[]> {
    return this.reviewModel.aggregate([
      {
        $match: { offerId: new Types.ObjectId(offerId) }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'hostId',
          foreignField: '_id',
          as: 'users',
        },
      },
      {
        $addFields: {
          id: {$toString: '$_id'},
          date: {$toString: '$createdAt'},
          author: { $arrayElemAt: ['$users', 0] },
        }
      },
      {
        $unset: ['users'],
      },
      { $sort: { createdAt: SortType.Down } },
      { $limit: DEFAULT_REVIEW_COUNT },
    ])
      .exec();
  }

  public async deleteByOfferId(offerId: string): Promise<number | null> {
    const result = await this.reviewModel.deleteMany({offerId});

    return result.deletedCount;
  }
}
