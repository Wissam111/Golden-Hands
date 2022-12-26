import AsyncStorage from "@react-native-async-storage/async-storage";
import getString from "../localization";
import showAlert from "../presentation/components/ShowAlert";

export const BASE_URL = "http://ec2-13-231-177-94.ap-northeast-1.compute.amazonaws.com/api/";
export const BASE_URL_DEV = "http://10.113.4.219:4000/api/";
export const IMAGE_BASE_URL = "http://ec2-13-231-177-94.ap-northeast-1.compute.amazonaws.com/imgs/";


/* 

{
  name :'tarik' ,
  age: 24
}

 
returns =>  ?name = tarik & age = 24

*/

// turn an object to a query string
const serialize = function (obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return "?" + str.join("&");
};



// gets the access token from the cache 
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



/**
 *  this is a global HTTP api call 
 * 
 * @param {*} url 
 * @param {*} method  GET / POST / DELETE / PATCH 
 * @param {*} body 
 * @param {*} queryParams 
 * @param {*} contentType 
 * @returns the server response as json
 */
export const apiCall = async (
  url,
  method = "GET",
  body,
  queryParams,
  contentType = "application/json"
) => {
  // console.log('apiCall' , url);
  const customURL = queryParams
    ? BASE_URL + url + serialize(queryParams)
    : BASE_URL + url;
  let bbody;
  if (body) {
    if (contentType === "multipart/form-data") {
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
