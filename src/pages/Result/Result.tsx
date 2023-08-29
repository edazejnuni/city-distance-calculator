import React, { useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "./Result.scss";
import minDots from "../../assets/images/min-dots.png";
import locationIcon from "../../assets/images/location.png";
import {
  StyledButton,
  StyledButtonDiv,
  StyledFormContainer,
  StyledSearchForm,
} from "../../assets/styled-components/main";

interface CityDistance {
  startCity: string;
  finalCity: string;
  distance: number;
}

interface ResultProps {}

const Result: React.FC<ResultProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalPassengers, selectedDate, destinations } = useParams<{
    totalDistance: string;
    totalPassengers: string;
    selectedDate: string;
    destinations: string | undefined;
  }>();
  const state = location.state || {
    passengerCount: 0,
    selectedDate: "",
    destinations: [],
  };
  const decodedDestinations = destinations || "";
  const destinationsArray = decodedDestinations.split("|");

  const cityDistances: CityDistance[] = destinationsArray.map((destination) => {
    const [startCity, finalCity, distance] = destination.split(":");
    return {
      startCity,
      finalCity,
      distance: parseFloat(distance),
    };
  });

  const calculatedTotalDistance = cityDistances.reduce(
    (total, cityDistance) => total + cityDistance.distance,
    0
  );

  useEffect(() => {
    const hasDijonError = cityDistances.some(
      (cityDistance) =>
        cityDistance.startCity === "Dijon" || cityDistance.finalCity === "Dijon"
    );

    if (hasDijonError) {
      navigate("/fail");
    }
  }, [cityDistances, navigate]);

  return (
    <StyledSearchForm>
      <StyledFormContainer>
        <div className="results-container">
          <div className="result-block">
            <>
              <div className="city-distances">
                {cityDistances.map((cityDistance, index) => (
                  <div key={index} className="city-results">
                    <div className="city-dots">
                      <img src={minDots} alt="dots" />
                      <span>{cityDistance.startCity}</span>
                    </div>
                    {index < cityDistances.length - 1 && (
                      <div className="distance">
                        {cityDistance.distance.toFixed(2)} km
                      </div>
                    )}
                  </div>
                ))}
                <div className="city-results final-location">
                  <div className="distance">
                    {cityDistances[cityDistances.length - 1]?.distance.toFixed(
                      2
                    )}{" "}
                    km
                  </div>
                  <div className="city-dots">
                    <img src={locationIcon} alt="location" />
                    <span>
                      {cityDistances[cityDistances.length - 1]?.finalCity}
                    </span>
                  </div>
                </div>
              </div>
              <div className="result-text">
                <span className="results">
                  {calculatedTotalDistance.toFixed(2)} km
                </span>{" "}
                is total distance
              </div>
              <div className="result-text">
                {totalPassengers === "1" ? (
                  <>
                    <span className="results">1</span> passenger
                  </>
                ) : (
                  <>
                    <span className="results">{totalPassengers}</span>{" "}
                    passengers
                  </>
                )}
              </div>
              <div className="result-text">
                <span className="results">{selectedDate}</span>
              </div>
              <StyledButtonDiv>
                <StyledButton type="submit">
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/", {
                        state: {
                          passengerCount: state.passengerCount,
                          selectedDate: state.selectedDate,
                          destinations: state.destinations,
                        },
                      });
                    }}
                  >
                    Back
                  </a>
                </StyledButton>
              </StyledButtonDiv>
            </>
          </div>
        </div>
      </StyledFormContainer>
    </StyledSearchForm>
  );
};

export default Result;
