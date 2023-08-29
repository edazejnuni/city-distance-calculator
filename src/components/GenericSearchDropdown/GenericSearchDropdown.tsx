import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import "./GenericSearchDropdown.scss";
import { StylesConfig } from "react-select";
import { ThreeDots } from "react-loader-spinner";

interface CityInfo {
  value: string;
  label: string;
  latitude: number;
  longitude: number;
  suggestions?: CityInfo[];
}

const customStyles: StylesConfig = {
  dropdownIndicator: (provided: any) => ({
    ...provided,
    display: "none",
  }),
  indicatorsContainer: (provided: any) => ({
    ...provided,
    display: "none",
  }),

  option: (provided: any, state: { isFocused: any }) => ({
    ...provided,
    fontSize: "12px",
    fontWeight: 500,
    color: "#374151",
    backgroundColor: state.isFocused ? "#C7D1F4" : "transparent",
    borderRadius: "4px",
    margin: "0 4px",
    cursor: "pointer",
  }),

  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "#FFFFFF",
    border: "1px solid #C7D1F4",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    marginTop: "10px",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    fontSize: "12px",
    fontWeight: 500,
  }),

  menuList: (provided: any) => ({
    ...provided,
    overflowX: "hidden",
    paddingTop: "5px",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#c7d1f4",
      borderRadius: "10px",
      border: "2px solid #ffffff",
      position: "relative",
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "&::before": {
      content: "''",
      position: "absolute",
      top: "-12px",
      left: "20px",
      zIndex: 100,
      borderLeft: "8px solid transparent",
      borderRight: "8px solid transparent",
      borderBottom: "8px solid #C7D1F4",
    },
  }),
};

interface GenericSearchDropdownProps {
  placeholder: string;
  cityData: CityInfo[];
  selectedCity?: string;
  className?: string;
  disabled?: boolean;

  onCitySelect?: (city: string) => void;
  onInputChange?: (inputValue: string) => void;
}

const GenericSearchDropdown: React.FC<GenericSearchDropdownProps> = ({
  placeholder,
  cityData,
  selectedCity,
  onCitySelect,
  onInputChange,
  disabled,
  className,
}) => {
  const [selectedOption, setSelectedOption] = useState<{
    value: string;
    label: string;
  } | null>(selectedCity ? { value: selectedCity, label: selectedCity } : null);

  const [isLoading, setIsLoading] = useState(false);
  const [searchFailed, setSearchFailed] = useState(false);

  const handleOptionChange = (selected: any) => {
    if (selected) {
      setSelectedOption(selected);
      if (onCitySelect) {
        onCitySelect(selected.value);
      }
    }
  };
  const loadCityOptions = (inputValue: string, callback: any) => {
    setIsLoading(true);
    setSearchFailed(false);

    if (typeof inputValue !== "string" || inputValue.toLowerCase() === "fail") {
      setIsLoading(false);
      setSearchFailed(true);
      callback([]);
      return;
    }

    setTimeout(() => {
      const suggestions: CityInfo[] = cityData
        .filter((city) => city.suggestions && Array.isArray(city.suggestions))
        .map((city) => city.suggestions!)
        .flat();

      if (suggestions.length === 0) {
        setIsLoading(false);
        callback([]);
        return;
      }

      const filteredOptions = suggestions.filter((option) =>
        option.label?.toLowerCase().includes(inputValue?.toLowerCase())
      );

      if (filteredOptions.length === 0) {
        setSearchFailed(true);
      }

      callback(filteredOptions);
      setIsLoading(false);
    }, 1000);
  };
  const handleInputChange = (inputValue: string) => {
    if (onInputChange) {
      onInputChange(inputValue);
    }
  };
  return (
    <div className="select">
      <label>{placeholder}</label>
      <AsyncSelect
        defaultValue={selectedOption}
        onChange={handleOptionChange}
        loadOptions={loadCityOptions}
        placeholder={searchFailed ? <p className="fail-error">Fail</p> : ""}
        isClearable
        className={className}
        styles={customStyles}
        isDisabled={disabled}
        onInputChange={handleInputChange}
        loadingMessage={() =>
          isLoading ? (
            <ThreeDots
              height="50"
              width="50"
              radius="9"
              color="#c7d1f4"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              visible={true}
            />
          ) : null
        }
      />

      {searchFailed && (
        <p className="error-message">
          Oops! Failed to search with this keyword.
        </p>
      )}
    </div>
  );
};

export default GenericSearchDropdown;
