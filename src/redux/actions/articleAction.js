import axios from "axios";
import { toast } from "react-toastify";

import showToast from "../../utils/notify";
import constants from "../constants/constant";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const {
  GET_ARTICLES,
  GET_ARTICLE_SUCCESS,
  ARTICLE_ADDED,
  ARTICLE_EDITED,
  ARTICLE_DELETED,
} = constants;

export const getAllArticles = () => async (dispatch) => {
  dispatch({ type: GET_ARTICLES });

  try {
    await axios.get(`${BASE_URL}/getAllArticle`).then((response) => {
      const { data, totalArticles } = response?.data;
      dispatch({ type: GET_ARTICLE_SUCCESS, data, totalArticles });
    });
  } catch (error) {
    showToast("Something Went Wrong!!", toast.error);
    return false;
  }
};

export const addArticles = (article) => async (dispatch) => {
  try {
    await axios.post(`${BASE_URL}/addArticle`, article).then((response) => {
      const { success, message } = response?.data;
      dispatch({ type: ARTICLE_ADDED, success, message });
      showToast(message, toast.success);
    });
  } catch (error) {
    showToast("Something Went Wrong!!", toast.error);
    return false;
  }
};

export const editArticles = (article, callback) => async (dispatch) => {
  try {
    await axios.post(`${BASE_URL}/editArticle`, article).then((response) => {
      const { success, message } = response?.data;
      dispatch({ type: ARTICLE_EDITED, success, message });
      showToast(message, toast.success);
      callback();
    });
  } catch (error) {
    showToast("Something Went Wrong!!", toast.error);
    return false;
  }
};

export const deleteArticles = (title, callback) => async (dispatch) => {
  try {
    await axios
      .post(`${BASE_URL}/deleteArticle`, { title })
      .then((response) => {
        const { success, message } = response?.data;
        dispatch({ type: ARTICLE_DELETED, success, message });
        showToast(message, toast.success);
        callback();
      });
  } catch (error) {
    showToast("Something Went Wrong!!", toast.error);
    return false;
  }
};
