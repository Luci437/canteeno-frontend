import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CategoryListType } from "./AddItems";

type CategoryContainerProps = {
  categoryList: CategoryListType[] | null;
  removeCategory: (categoryId: number) => void;
};

export const CategoryContainer = ({
  categoryList,
  removeCategory,
}: CategoryContainerProps) => {
  return (
    <>
      {categoryList && categoryList.length > 0 && (
        <div className="category-container">
          {categoryList.map((category) => (
            <div className="category-item" key={category.id}>
              {category.label}
              <FontAwesomeIcon
                icon={faXmark}
                className="category-item-cross"
                onClick={removeCategory.bind(null, category.id)}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};
