const BASE_URL = "https://tripapi.cphbusinessapps.dk/api/";
const LOGIN_ENDPOINT = "auth/login";
const TRIPS_ENDPOINT = "trips";
const GUIDES_ENDPOINT = "guides";
const CATEGORIES_ENDPOINT =
  "https://packingapi.cphbusinessapps.dk/packinglist/";

function handleHttpErrors(res) {
  if (!res.ok) {
    return res.json().then((fullError) => {
      const error = { status: res.status, fullError };
      throw error; // Throw the error object for centralized handling
    });
  }
  return res.json();
}

const setToken = (token) => {
  localStorage.setItem("jwtToken", token);
};
const getToken = () => {
  return localStorage.getItem("jwtToken");
};
const loggedIn = () => {
  const loggedIn = getToken() != null;
  return loggedIn;
};
const logout = () => {
  localStorage.removeItem("jwtToken");
};

const login = (user, password) => {
  const options = makeOptions("POST", false, {
    username: user,
    password: password,
  });
  return fetch(BASE_URL + LOGIN_ENDPOINT, options)
    .then(handleHttpErrors)
    .then((res) => {
      setToken(res.token);
    });
};

const fetchData = () => {
  const options = makeOptions("GET", true); //True add's the token
  return fetch(BASE_URL + "hotels", options).then(handleHttpErrors);
};
const fetchTripsData = (callback, errorCallback) => {
  const options = makeOptions("GET", false); //True add's the token
  return fetch(BASE_URL + TRIPS_ENDPOINT, options)
    .then(handleHttpErrors)
    .then((data) => callback(data || []))
    .catch((error) => {
      if (errorCallback) {
        errorCallback(error.status); // Pass the status to the errorCallback
      } else {
        console.error("Error fetching trips:", error);
      }
    });
};
const fetchCategories = (callback, errorCallback) => {
  const options = makeOptions("GET", false); //True add's the token
  return fetch(CATEGORIES_ENDPOINT, options)
    .then(handleHttpErrors)
    .then((data) => callback(data.categories || []))
    .catch((error) => {
      if (errorCallback) {
        errorCallback(error.status); // Pass the status to the errorCallback
      } else {
        console.error("Error fetching categories:", error);
      }
    });
};
const fetchTripDetails = (tripId, callback, errorCallback) => {
  const options = makeOptions("GET", true); //True add's the token
  return fetch(BASE_URL + TRIPS_ENDPOINT + "/" + tripId, options)
    .then(handleHttpErrors)
    .then((data) => callback(data))
    .catch((error) => {
      if (errorCallback) {
        errorCallback(error.status); // Pass the status to the errorCallback
      } else {
        console.error("Error fetching trip details:", error);
      }
    });
};
const fetchGuides = (callback, errorCallback) => {
  const options = makeOptions("GET", true); // True adds the token
  return fetch(BASE_URL + GUIDES_ENDPOINT, options)
    .then(handleHttpErrors)
    .then((data) => callback(data || []))
    .catch((error) => {
      if (errorCallback) {
        errorCallback(error.status); // Pass the status to the errorCallback
      } else {
        console.error("Error fetching guides:", error);
      }
    });
};

const makeOptions = (method, addToken, body) => {
  var opts = {
    method: method,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
  };
  if (addToken && loggedIn()) {
    opts.headers["Authorization"] = `Bearer ${getToken()}`;
  }
  if (body) {
    opts.body = JSON.stringify(body);
  }
  return opts;
};

const getUserRoles = () => {
  const token = getToken();
  if (token != null) {
    const payloadBase64 = getToken().split(".")[1];
    const decodedClaims = JSON.parse(window.atob(payloadBase64));
    const roles = decodedClaims.roles;
    return roles;
  } else return "";
};

const getUserName = () => {
  const token = getToken();
  if (token != null) {
    const payloadBase64 = getToken().split(".")[1];
    const decodedClaims = JSON.parse(window.atob(payloadBase64));
    const userName = decodedClaims.username;
    return userName;
  } else return "";
};

const hasUserAccess = (neededRole, loggedIn) => {
  const roles = getUserRoles().split(",");
  return loggedIn && roles.includes(neededRole);
};

const facade = {
  makeOptions,
  setToken,
  getToken,
  loggedIn,
  login,
  logout,
  fetchData,
  fetchTripsData,
  fetchCategories,
  fetchTripDetails,
  fetchGuides,
  hasUserAccess,
  getUserName,
};

export default facade;
