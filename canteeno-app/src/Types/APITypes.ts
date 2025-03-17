export type AddItemsType = {
  name: string;
  description?: string;
  price: number;
  quantity: number;
  image?: string;
};

export type CategoryType = {
  categoryId: number;
  name: string;
};

export type ItemStockType = {
  itemId: number;
  availableQuantity: number;
  reservedQuantity: number;
  totalQuantity: number;
  isUnlimited: boolean;
};

export type StoreType = {
  storeId: number;
  name: string;
  location: string;
};

export type ItemResponseType = {
  available: boolean;
  categories: CategoryType[];
  createdAt: string;
  createdBy: string;
  description: string;
  imageUrls: string[];
  itemId: number;
  itemStock?: ItemStockType;
  name: string;
  price: number;
  store: StoreType;
  updatedAt: string;
  updatedBy: string;
};
