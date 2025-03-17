import { Button } from "../Common/Button";
import { InputBox } from "../Common/Input";

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
  return (
    <>
      <div className="admin-content-entry-section">
        <div className="admin-content-entry-section-inner">
          <h2>Add Categories</h2>
          <div className="admin-content-entry-section-inner-form">
            <InputBox placeholder="Add Categories Name" />
            <InputBox placeholder="Add Categories Description" />

            <Button value="SUMBIT" />
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
            <tr>
              <td>1</td>
              <td>Aloo Paratha</td>
              <td>Paratha with Aloo</td>

              <td>
                <Button value="Edit" />
                <Button value="Delete" />
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Aloo Paratha</td>
              <td>Paratha with Aloo</td>

              <td>
                <Button value="Edit" />
                <Button value="Delete" />
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Aloo Paratha</td>
              <td>Paratha with Aloo</td>

              <td>
                <Button value="Edit" />
                <Button value="Delete" />
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Aloo Paratha</td>
              <td>Paratha with Aloo</td>

              <td>
                <Button value="Edit" />
                <Button value="Delete" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
