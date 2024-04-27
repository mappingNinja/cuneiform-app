import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getAllArticles } from "../../redux/actions/articleAction";

const ViewArticle = () => {
  const { slug } = useParams();

  const dispatch = useDispatch();
  const articles = useSelector((state) => state?.articles?.data);

  const article = articles?.filter((article) => {
    return article?.slug === slug;
  });
  const fetchArticles = () => {
    dispatch(getAllArticles());
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      {article &&
        article?.map((article, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card" style={{ width: "100%" }}>
              <div className="card-body">
                <span
                  className=" position-absolute top-0  translate-middle badge rounded-pill bg-secondary"
                  style={{ left: "50%", zIndex: "1" }}
                >
                  {article?.category}
                </span>
                <h5 className="card-title mt-3">{article?.title}</h5>
                <h6 className="card-slug mb-2 text-muted">/{article?.slug}</h6>
                <p className="card-text">{article?.description}</p>
                <p className="card-text">
                  <span className="fw-semibold">Created At: </span>
                  {new Date(article?.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ViewArticle;
