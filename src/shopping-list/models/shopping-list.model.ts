import {
  Table,
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  Model,
  BelongsTo,
  AllowNull,
} from "sequelize-typescript";
import { PromoCode } from "../../promo-code/models/promo-code.model";

@Table
export class ShoppingList extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;
  
  @AllowNull(true)
  @ForeignKey(() => PromoCode)
  @Column(DataType.INTEGER)
  promoCodeId: number;

  @BelongsTo(() => PromoCode)
  promoCode: PromoCode;
}
