import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Unique,
} from "sequelize-typescript";

@Table
export class PromoCode extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  code: string;

  @AllowNull(false)
  @Column(DataType.FLOAT)
  discountPercentage: number;
}
