import AsyncStorage from "@react-native-async-storage/async-storage";
import getString from "../localization";
import showAlert from "../presentation/components/ShowAlert";

export const BASE_URL = "https://saloon-ibra-api.herokuapp.com/api/";
export const BASE_URL_DEV = "http://192.168.1.46:4000/api/";
export const IMAGE_BASE_URL = "https://saloon-ibra-api.herokuapp.com/imgs/";

const serialize = function (obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return "?" + str.join("&");
};

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token == null) return null;
    return token;
  } catch (e) {
    console.log("getToken:", e);
  }
};

export const getUserId = async () => {
  try {
    const userJson = await AsyncStorage.getItem("user");
    if (userJson == null) return null;

    const user = JSON.parse(userJson);
    return user._id;
  } catch (e) {
    console.log("getUserId:", e);
  }
};

export const apiCall = async (
  url,
  method = "GET",
  body,
  queryParams,
  contentType = "application/json"
) => {
  const customURL = queryParams
    ? BASE_URL + url + serialize(queryParams)
    : BASE_URL + url;
  let bbody;

  console.log(queryParams);
  if (body) {
    if (contentType === "multipart/form-data") {
      console.log(body);
      bbody = body;
    } else {
      bbody = JSON.stringify(body);
    }
  } else {
    bbody = null;
  }

  const result = await fetch(customURL, {
    headers: {
      "Content-Type": contentType,
      Authorization: `Bearer ${await getToken()}`,
    },
    method: method,
    body: bbody,
  });
  const json = await result.json();

  if (!result.ok) {
    if (result.status === 401) {
      showAlert(getString.t("error"), getString.t("you_are_not_authorized"));
    }

    throw {
      status: result.status,
      ...json,
    };
  }

  return json;
};
