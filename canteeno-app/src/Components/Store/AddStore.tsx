import { Button } from "../Common/Button";
import { InputBox } from "../Common/Input";
import axiosInstance from "../../Utils/axiosConfig";
import { useEffect, useState } from "react";

export type StoreType = {
  storeId: number;
  name: string;
  location: string;
  contactInfo: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
};

export const AddStore = () => {
  const [storeList, setStoreList] = useState<StoreType[]>([]);
  const [storeName, setStoreName] = useState<string>("");
  const [storeLocation, setStoreLocation] = useState<string>("");
  const [storeContact, setStoreContact] = useState<string>("");
  const [isEdit, setIsEdit] = useState(false);
  const [editingStoreId, setEditingStoreId] = useState<number | null>();

  const getStoreList = () => {
    // Fetch store list from the server
    axiosInstance
      .get("http://localhost:8080/api/catalog/store")
      .then((res) => {
        if (res.status === 200) {
          setStoreList(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getStoreList();
  }, []);

  const handleStoreSubmit = () => {
    if (isEdit) {
      axiosInstance
        .put(`http://localhost:8080/api/catalog/store`, {
          storeId: editingStoreId,
          name: storeName,
          location: storeLocation,
          contactInfo: storeContact,
        })
        .then((res) => {
          if (res.status === 200) {
            getStoreList();
            setStoreName("");
            setStoreLocation("");
            setStoreContact("");
            setIsEdit(false);
            setEditingStoreId(null);
          }
        });
      return;
    }
    axiosInstance
      .post("http://localhost:8080/api/catalog/store", {
        name: storeName,
        location: storeLocation,
        contactInfo: storeContact,
      })
      .then((res) => {
        if (res.status === 200) {
          getStoreList();
          setStoreName("");
          setStoreLocation("");
          setStoreContact("");
        }
      });
  };

  const handleDeleteStore = (storeId: number) => {
    axiosInstance
      .delete(`http://localhost:8080/api/catalog/store/${storeId}`)
      .then((res) => {
        if (res.status === 204) {
          getStoreList();
        }
      });
  };

  const handleStoreUpdate = (storeId: number) => {
    axiosInstance
      .get(`http://localhost:8080/api/catalog/store/${storeId}`)
      .then((res) => {
        if (res.status === 200) {
          setStoreName(res.data.name);
          setStoreLocation(res.data.location);
          setStoreContact(res.data.contactInfo);
          setIsEdit(true);
          setEditingStoreId(storeId);
        }
      });
  };

  return (
    <>
      <div className="admin-content-entry-section">
        <div className="admin-content-entry-section-inner">
          <h2>Add Store</h2>
          <div className="admin-content-entry-section-inner-form">
            <InputBox
              placeholder="Add Store Name"
              value={storeName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setStoreName(e.target.value)
              }
            />
            <InputBox
              placeholder="Add Store Location"
              value={storeLocation}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setStoreLocation(e.target.value)
              }
            />
            <InputBox
              placeholder="Add Store Contact"
              value={storeContact}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setStoreContact(e.target.value)
              }
            />

            <Button value="SUBMIT" onClick={handleStoreSubmit} />
          </div>
        </div>
      </div>
      <div className="admin-content-display-section">
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Store Name</th>
              <th>Store Location</th>
              <th>Store Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {storeList.map((store, index) => (
              <tr key={store.storeId}>
                <td>{index + 1}</td>
                <td>{store.name}</td>
                <td>{store.location}</td>
                <td>{store.contactInfo}</td>
                <td>
                  <Button
                    value="Edit"
                    onClick={() => handleStoreUpdate(store.storeId)}
                  />
                  <Button
                    value="Delete"
                    onClick={() => handleDeleteStore(store.storeId)}
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
