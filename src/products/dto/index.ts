export type CreateProductDto = {
  name: string;
  quantity: number;
  price: number;
};

export type UpdateProductDto = {
  name?: string;
  quantity?: number;
  price?: number;
};
