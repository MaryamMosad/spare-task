// models/ShoppingListItem.ts
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  PrimaryKey,
  AutoIncrement,
  BelongsTo,
  Unique,
} from "sequelize-typescript";
import { Product } from "../../products/models/products.model";

@Table
export class ShoppingListItem extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Unique
  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, onDelete: "CASCADE" })
  productId: number;

  @BelongsTo(() => Product)
  product: Product;

  @Column
  quantity: number;
}
