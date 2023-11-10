import { PartialType } from '@nestjs/swagger';
import { CreateProductReview } from './products.create-review.dto';

export class UpdateProductReviewDto extends PartialType(CreateProductReview) {}
