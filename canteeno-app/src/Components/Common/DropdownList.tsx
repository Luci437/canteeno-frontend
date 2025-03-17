import React, { useState } from "react";
import "../../Assets/Css/DropdownList.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

interface DropdownListProps {
  options: { id: number; label: string }[];
  placeholder?: string;
  onSelect: (option: number) => void;
}

const DropdownList: React.FC<DropdownListProps> = ({
  options,
  placeholder = "Select an option",
  onSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option: { id: number; label: string }) => {
    setSelectedOption(option.label);

    onSelect(option.id);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const dropdownElement = document.querySelector(".dropdown");
    if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption || placeholder}
        <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>
          <FontAwesomeIcon icon={faAngleDown} />
        </span>
      </div>
      {isOpen && (
        <div className="dropdown-body">
          <input
            type="text"
            className="dropdown-search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul className="dropdown-list">
            {filteredOptions.map((option, index) => (
              <li
                key={index}
                className="dropdown-item"
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownList;
