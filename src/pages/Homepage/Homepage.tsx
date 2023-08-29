import React, { useEffect, useState } from "react";
import axios from "axios";
import GenericSearchDropdown from "../../components/GenericSearchDropdown/GenericSearchDropdown";
import {
  FlexDirectionalBox,
  StyledButton,
  StyledButtonDiv,
  StyledFormContainer,
  StyledSearchForm,
} from "../../assets/styled-components/main";
import "./Homepage.scss";
import GenericInputNumeric from "../../components/GenericInputNumeric/GenericInputNumeric";
import GenericDatePicker from "../../components/GenericDatePicker/GenericDatePicker";
import dots from "../../assets/images/dots.png";
import location from "../../assets/images/location.png";
import remove from "../../assets/images/remove.png";
import add from "../../assets/images/add.png";
import { calculateDistances } from "../../utils/calculateDistanceApi";
import { useNavigate } from "react-router-dom";

interface CityInfo {
  value: string;
  label: string;
  latitude: number;
  longitude: number;
  suggestions?: CityInfo[];
}

const Homepage: React.FC = () => {
  const navigate = useNavigate();
  const [cityData, setCityData] = useState<CityInfo[]>([]);
  const [dateError, setDateError] = useState<string>("");
  const [dateErrorCheck, setDateErrorCheck] = useState<boolean>(false);
  const [passengerCountError, setPassengerCountError] = useState<string>("");
  const [passengerCount, setPassengerCount] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [destinations, setDestinations] = useState([""]);
  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const response = await axios.post(
          "https://a776-2a02-dd07-8000-6700-4c6f-2f9e-f329-5db3.ngrok.io/searchCities",
          {
            keyword: "",
          }
        );
        setCityData(response.data);
      } catch (error) {
        console.error("Error fetching city data:", error);
      }
    };

    fetchCityData();
  }, []);
  const addDestination = () => {
    setDestinations([...destinations, ""]);
  };
  const removeDestination = (index: number) => {
    const updatedDestinations = [...destinations];
    updatedDestinations.splice(index, 1);
    setDestinations(updatedDestinations);
  };
  const updateDestination = (index: number, value: string) => {
    const updatedDestinations = [...destinations];
    updatedDestinations[index] = value;
    setDestinations(updatedDestinations);
    console.log(destinations);
  };
  useEffect(() => {
    setDestinations(["", ""]);
  }, []);
  const handleCitySearch = async (inputValue: string, index: number) => {
    try {
      const response = await axios.post(
        "https://a776-2a02-dd07-8000-6700-4c6f-2f9e-f329-5db3.ngrok.io/searchCities",
        {
          keyword: inputValue,
        }
      );

      const citySuggestions = response.data.map((city: any) => ({
        value: city.value,
        label: city.label,
        latitude: city.latitude,
        longitude: city.longitude,
      }));

      const updatedCityData = cityData.map((city, i) => ({
        ...city,
        suggestions: i === index ? citySuggestions : [],
      }));

      setCityData(updatedCityData);
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
    }
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(selectedDate);

    const totalPassengers = passengerCount;
    const formattedSelectedDate = formattedDate;
    try {
      const citiesWithCoordinates = destinations
        .map((destination) => {
          const selectedCity = cityData.find(
            (city) => city.value === destination
          );
          if (selectedCity) {
            return {
              value: selectedCity.value,
              label: selectedCity.label,
              latitude: selectedCity.latitude,
              longitude: selectedCity.longitude,
            };
          } else {
            return null;
          }
        })
        .filter((city) => city !== null) as CityInfo[];

      const distancesArray = await calculateDistances(citiesWithCoordinates);

      let total = 0;
      const distancesSummary: string[] = [];

      for (let i = 0; i < distancesArray.length; i++) {
        const distanceInfo = distancesArray[i];
        const { startCity, finalCity, distance } = distanceInfo;

        total += distance;
        distancesSummary.push(`${startCity}:${finalCity}:${distance}`);
      }

      if (passengerCount === 0) {
        setPassengerCountError("Select passengers");
        return;
      } else {
        setPassengerCountError("");
      }

      const destinationsParam = encodeURIComponent(distancesSummary.join("|"));

      navigate(
        `/result/${total}/${totalPassengers}/${formattedSelectedDate}/${destinationsParam}`,
        {
          state: {
            passengerCount: totalPassengers,
            selectedDate: formattedSelectedDate,
            destinations: destinations,
          },
        }
      );
    } catch (error) {
      console.error("Error calculating distances:", error);
    }
  };
  const hasInteractedWithDestination = destinations.some(
    (destination, index) => index > 0 && destination !== ""
  );
  return (
    <StyledSearchForm>
      <StyledFormContainer>
        <form onSubmit={handleSubmit}>
          <FlexDirectionalBox>
            <div style={{ width: "100%" }}>
              {destinations.map((destination, index) => (
                <div className="search-box" key={index}>
                  <img
                    src={index === destinations.length - 1 ? location : dots}
                    alt="icon"
                    className="icon"
                  />
                  <div style={{ width: "100%" }}>
                    <GenericSearchDropdown
                      placeholder={
                        index === 0 ? "City of Origin" : "City of Destination"
                      }
                      cityData={cityData}
                      selectedCity={destination}
                      onCitySelect={(value) => updateDestination(index, value)}
                      onInputChange={(inputValue) =>
                        handleCitySearch(inputValue, index)
                      }
                      className={
                        index === 0 &&
                        hasInteractedWithDestination &&
                        destinations[0] === ""
                          ? "error"
                          : ""
                      }
                    />
                    {index === 0 &&
                      hasInteractedWithDestination &&
                      destinations[0] === "" && (
                        <p className="error-message">
                          You must choose the city of origin
                        </p>
                      )}
                  </div>
                  {destination !== "" &&
                    !cityData.some((city) => city.value === destination) && (
                      <p className="error-message">
                        Oops! Failed to search with this keyword.
                      </p>
                    )}
                  {index > 0 && (
                    <button
                      className="remove-btn"
                      type="button"
                      onClick={() => removeDestination(index)}
                    >
                      <img src={remove} alt="" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="add-btn"
                onClick={addDestination}
              >
                <img src={add} alt="" />
                Add Destination
              </button>
            </div>
            <div className="space-holder">
              <GenericInputNumeric
                value={passengerCount}
                onValueChange={(newValue) => {
                  setPassengerCount(newValue);
                  if (passengerCount > -1) {
                    setPassengerCountError("");
                  }
                }}
                className={
                  passengerCountError ? "error numeric-input" : "numeric-input"
                }
              />
              {passengerCountError ? (
                <p className="error-message passanger-error">
                  {passengerCountError}
                </p>
              ) : null}
              <div style={{ position: "relative" }}>
                <GenericDatePicker
                  className={dateError ? "date-error-border" : ""}
                  onSelectDate={(selectedDate) => {
                    const currentDate = new Date();
                    if (selectedDate >= currentDate) {
                      setSelectedDate(selectedDate);
                      setDateError("");
                      setDateErrorCheck(false);
                    } else {
                      setDateErrorCheck(true);
                      setDateError(
                        "You can't select a date before today's date!"
                      );
                    }
                  }}
                />
                {dateError && (
                  <p className="error-message date-error">{dateError}</p>
                )}
              </div>
            </div>
          </FlexDirectionalBox>
          <StyledButtonDiv>
            <StyledButton
              type="submit"
              disabled={
                dateErrorCheck ||
                destinations.some((destination) => destination === "")
              }
            >
              Submit
            </StyledButton>
          </StyledButtonDiv>
        </form>
      </StyledFormContainer>
    </StyledSearchForm>
  );
};

export default Homepage;
