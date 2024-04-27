import constants from "../constants/constant";

const {
  GET_ARTICLES,
  GET_ARTICLE_SUCCESS,
  GET_ARTICLES_FAILED,
  ARTICLE_ADDED,
  ARTICLE_EDITED,
  ARTICLE_DELETED,
  FILTER_ARTICLES_BY_SLUG,
} = constants;

export const articleReducer = (state = {}, action) => {
  const { type, data, totalArticles, success, message, error } = action;
  switch (type) {
    case GET_ARTICLES:
      return { loading: true };
    case GET_ARTICLE_SUCCESS:
      return { loading: false, data, totalArticles };
    case GET_ARTICLES_FAILED:
      return { loading: false, error };
    case ARTICLE_ADDED:
      return { loading: false, success, message };
    case ARTICLE_EDITED:
      return { loading: false, success, message };
    case ARTICLE_DELETED:
      return { loading: false, success, message };

    default:
      return state;
  }
};
