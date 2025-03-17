import { useEffect, useState } from "react";

import axiosInstance from "../../Utils/axiosConfig";
import { Button } from "../Common/Button";
import { InputBox } from "../Common/Input";
import { ItemResponseType } from "../../Types/APITypes";
import DropdownList from "../Common/DropdownList";
import { CategoryType } from "./AddCategories";

export type ItemDataType = {
  name: string;
  description: string;
  price: string;
  available: boolean;
  storeId: number;
  categoryIds: number[];
  image: File | null;
};

export const AddItems = () => {
  const [itemData, setItemData] = useState<ItemDataType>({
    name: "",
    description: "",
    price: "",
    image: null,
    available: true,
    storeId: 1,
    categoryIds: [3, 4],
  });
  const [itemList, setItemList] = useState<ItemResponseType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const getCategoryList = () => {
    axiosInstance
      .get("http://localhost:8080/api/catalog/category")
      .then((res) => {
        if (res.status === 200) {
          setCategories(res.data);
        }
      });
    // Fetch category list from the server
  };

  const getItemList = () => {
    axiosInstance
      .get("http://localhost:8080/api/catalog/item")
      .then((res) => {
        setItemList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddItem = () => {
    const itemDataBlob = new Blob([JSON.stringify(itemData)], {
      type: "application/json",
    });
    const formData = new FormData();
    formData.append("request", itemDataBlob);
    formData.append("images", itemData.image!);

    axiosInstance
      .postForm("http://localhost:8080/api/catalog/item", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          getItemList();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleItemDelete = (itemId: number) => {
    axiosInstance
      .delete(`http://localhost:8080/api/catalog/item/${itemId}`)
      .then((res) => {
        console.log(res);
        if (res.status === 204) {
          getItemList();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getItemList();
    getCategoryList();
  }, []);
  return (
    <>
      <div className="admin-content-entry-section">
        <div className="admin-content-entry-section-inner">
          <h2>Add Items</h2>
          <div className="admin-content-entry-section-inner-form">
            <InputBox
              placeholder="Add Item Name"
              value={itemData.name}
              name="name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setItemData({ ...itemData, name: e.target.value });
              }}
            />
            <InputBox
              placeholder="Add Item Description"
              value={itemData.description}
              name="description"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setItemData({ ...itemData, description: e.target.value });
              }}
            />
            <InputBox
              placeholder="Add Item Price"
              value={itemData.price}
              name="price"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setItemData({ ...itemData, price: e.target.value });
              }}
            />

            <DropdownList
              options={categories.map((category) => ({
                id: category.categoryId,
                label: category.name,
              }))}
              onSelect={() => {}}
              placeholder="Select Category"
            />

            <InputBox
              placeholder="Add Item Image"
              type="file"
              accept="image/*"
              name="image"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setItemData({ ...itemData, image: e.target.files![0] });
              }}
            />
            <Button onClick={handleAddItem} value="SUBMIT" />
          </div>
        </div>
      </div>
      <div className="admin-content-display-section">
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Item Name</th>
              <th>Item Description</th>
              <th>Item Price</th>
              <th>Item Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {itemList.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>₹ {item.price}</td>
                <td>
                  <a href={item.imageUrls[0]} target="_blank" rel="noreferrer">
                    Image URL
                  </a>
                </td>
                <td>
                  <Button value="Edit" />
                  <Button
                    value="Delete"
                    onClick={() => handleItemDelete(item.itemId)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
