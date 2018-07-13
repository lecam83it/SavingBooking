import { getItems } from "../api/getItems";

export function fetchItemsSuccess(data) {
  return { type: "FETCH_SUCCESS", data };
}
export function fetchItemsError() {
  return { type: "FETCH_ERROR" };
}

export function fetchItems(url) {
  return dispatch => {
    return getItems(url)
      .then(resJSON => {
        dispatch(fetchItemsSuccess(resJSON));
      })
      .catch(err => dispatch(fetchItemsError()));
  };
}
