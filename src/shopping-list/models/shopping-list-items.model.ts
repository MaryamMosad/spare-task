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
import { ShoppingList } from "./shopping-list.model";

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

  @ForeignKey(() => ShoppingList)
  @Column(DataType.INTEGER)
  shoppingListId: number;

  @BelongsTo(() => ShoppingList, { onDelete: "CASCADE" })
  shoppingList: ShoppingList;
}
