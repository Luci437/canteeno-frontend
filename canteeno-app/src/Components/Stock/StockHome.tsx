import { useEffect, useState } from "react";

import axiosInstance from "../../Utils/axiosConfig";
import { Button } from "../Common/Button";
import { InputBox } from "../Common/Input";
import { ItemResponseType } from "../../Types/APITypes";
import DropdownList from "../Common/DropdownList";

export const StockHome = () => {
  const [items, setItems] = useState<ItemResponseType[]>([]);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [stockQuantity, setStockQuantity] = useState<string | null>(null);
  const [isUnlimited, setIsUnlimited] = useState<boolean>(false);

  const getItems = () => {
    axiosInstance.get("http://localhost:8080/api/catalog/item").then((res) => {
      if (res.status === 200) {
        setItems(res.data);
      }
    });
  };

  useEffect(() => {
    getItems();
  }, []);

  const findCurrentItemStock = (itemId: number) => {
    const item = items.find((item) => item.itemId === itemId);
    setStockQuantity(item?.itemStock?.availableQuantity.toString() || "0");
    setSelectedItem(itemId);
  };

  const handleStockUpdate = () => {
    if (selectedItem && stockQuantity) {
      axiosInstance
        .put(`http://localhost:8080/api/catalog/item/stock/${selectedItem}`, {
          itemId: selectedItem,
          totalQuantity: parseInt(stockQuantity),
          isUnlimited: isUnlimited,
        })
        .then((res) => {
          if (res.status === 200) {
            getItems();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="admin-content-entry-section">
        <div className="admin-content-entry-section-inner">
          <h2>Add Stocks</h2>
          <div className="admin-content-entry-section-inner-form">
            <DropdownList
              options={items.map((data) => ({
                id: data.itemId,
                label: data.name,
              }))}
              value={selectedItem}
              onSelect={(id: number) => findCurrentItemStock(id)}
              placeholder="Select Item"
            />

            <InputBox
              placeholder="Add Item Stock"
              type="text"
              name="stockQuantity"
              value={stockQuantity}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setStockQuantity(e.target.value);
              }}
            />
            <div className="admin-content-entry-section-inner-form-radio">
              <label>Unlimited</label>
              <label htmlFor="yes">Yes</label>
              <InputBox
                type="radio"
                id="yes"
                name="isUnlimited"
                checked={isUnlimited ? "true" : "false"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setIsUnlimited(e.target.value === "true");
                }}
              />
              <label htmlFor="no">No</label>
              <InputBox
                type="radio"
                id="no"
                name="isUnlimited"
                checked={isUnlimited ? "true" : "false"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setIsUnlimited(e.target.value === "true");
                }}
              />
            </div>
            <Button onClick={handleStockUpdate} value="SUBMIT" />
          </div>
        </div>
      </div>
      <div className="admin-content-display-section">
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Item Name</th>
              <th>Item Price</th>
              <th>Item Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>index</td>
                <td>{item.name}</td>
                <td>₹ {item.price}</td>
                <td>{item?.itemStock?.availableQuantity}</td>

                <td>
                  <Button value="Delete" onClick={() => {}} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
