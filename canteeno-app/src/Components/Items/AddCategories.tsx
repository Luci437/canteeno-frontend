import { Button } from "../Common/Button";
import { InputBox } from "../Common/Input";
import axiosInstance from "../../Utils/axiosConfig";
import { useEffect, useState } from "react";

export type CategoryType = {
  categoryId: number;
  name: string;
  description: string;
  createdBy: string;
  createdAt: string; // Consider using `Date` if you plan to handle date objects
  updatedBy: string;
  updatedAt: string; // Consider using `Date` if you plan to handle date objects
};

export const AddCategories = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryDescription, setCategoryDescription] = useState<string>("");
  const [isEdit, setIsEdit] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>();

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

  useEffect(() => {
    getCategoryList();
  }, []);

  const handleCategorySubmit = () => {
    if (isEdit) {
      axiosInstance
        .put(`http://localhost:8080/api/catalog/category`, {
          categoryId: editingCategoryId,
          name: categoryName,
          description: categoryDescription,
        })
        .then((res) => {
          if (res.status === 200) {
            getCategoryList();
            setCategoryName("");
            setCategoryDescription("");
            setIsEdit(false);
            setEditingCategoryId(null);
          }
        });
      return;
    }
    axiosInstance
      .post("http://localhost:8080/api/catalog/category", {
        name: categoryName,
        description: categoryDescription,
      })
      .then((res) => {
        if (res.status === 200) {
          getCategoryList();
          setCategoryName("");
          setCategoryDescription("");
        }
      });
  };

  const handleDeleteCategory = (categoryId: number) => {
    axiosInstance
      .delete(`http://localhost:8080/api/catalog/category/${categoryId}`)
      .then((res) => {
        if (res.status === 204) {
          getCategoryList();
        }
      });
  };

  const handleUpdateCategory = (categoryId: number) => {
    axiosInstance
      .get(`http://localhost:8080/api/catalog/category/${categoryId}`)
      .then((res) => {
        if (res.status === 200) {
          setCategoryName(res.data.name);
          setCategoryDescription(res.data.description);
          setIsEdit(true);
          setEditingCategoryId(categoryId);
        }
      });
  };

  return (
    <>
      <div className="admin-content-entry-section">
        <div className="admin-content-entry-section-inner">
          <h2>Add Categories</h2>
          <div className="admin-content-entry-section-inner-form">
            <InputBox
              placeholder="Add Categories Name"
              value={categoryName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCategoryName(e.target.value)
              }
            />
            <InputBox
              placeholder="Add Categories Description"
              value={categoryDescription}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCategoryDescription(e.target.value)
              }
            />

            <Button value="SUMBIT" onClick={handleCategorySubmit} />
          </div>
        </div>
      </div>
      <div className="admin-content-display-section">
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Categories Name</th>
              <th>Categories Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category.categoryId}>
                <td>{index + 1}</td>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>
                  <Button
                    value="Edit"
                    onClick={() => handleUpdateCategory(category.categoryId)}
                  />
                  <Button
                    value="Delete"
                    onClick={() => handleDeleteCategory(category.categoryId)}
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
