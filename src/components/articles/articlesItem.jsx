import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrash } from "react-icons/fa";

import {
  getAllArticles,
  deleteArticles,
} from "../../redux/actions/articleAction";
import ArticleForm from "./articleForm";
import { Link } from "react-router-dom";

const ArticlesItem = ({ searchQuery, isSortByDate, sortDirection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editArticle, setEditArticle] = useState({});

  const dispatch = useDispatch();
  const articles = useSelector((state) => state?.articles);

  const fetchAllArticles = () => {
    dispatch(getAllArticles());
  };

  let filteredArticles = articles?.data;

  // Check if there is a search query
  if (searchQuery) {
    filteredArticles = filteredArticles?.filter((item) =>
      item?.title?.toLowerCase().includes(searchQuery?.toLowerCase())
    );
  }

  // Check if sortbydate is enabled
  if (isSortByDate) {
    filteredArticles = filteredArticles?.sort((a, b) => {
      const dateA = new Date(a?.createdAt);
      const dateB = new Date(b?.createdAt);
      if (sortDirection === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
  }

  const handleEdit = (article) => {
    setIsOpen(true);
    setEditArticle(article);
  };

  const handleDelete = (articleTitle) => {
    dispatch(deleteArticles(articleTitle, fetchAllArticles));
  };

  useEffect(() => {
    fetchAllArticles();
  }, []);

  return (
    <>
      {" "}
      <div className="article-item-container">
        {filteredArticles?.length === 0 ? (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <Link to={"/articleForm"}>
              <button className="btn btn-secondary">Create Article</button>
            </Link>
          </div>
        ) : (
          <div className="row">
            {filteredArticles &&
              filteredArticles?.map((article, index) => (
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
                      <h6 className="card-slug mb-2 text-muted">
                        {article?.slug}
                      </h6>
                      <p className="card-text">{article?.description}</p>
                      <p className="card-text">
                        <span className="fw-semibold">Created At: </span>
                        {new Date(article?.createdAt).toLocaleDateString()}
                      </p>

                      <div className="d-flex justify-content-between align-items-center">
                        <Link to={`/article/${article?.slug}`}>
                          <button className="btn btn-primary">View</button>
                        </Link>
                        <div>
                          <FaEdit
                            className="text-primary"
                            onClick={() => handleEdit(article)}
                          />
                          <FaTrash
                            className="text-danger mx-2"
                            onClick={() => handleDelete(article?.title)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
      <Modal isOpen={isOpen}>
        <ModalHeader toggle={() => setIsOpen(false)}>Edit Article</ModalHeader>
        <ModalBody className="px-4">
          <ArticleForm
            initialValues={editArticle}
            buttonText={"Update Article"}
            isUpdate={true}
            setIsOpen={setIsOpen}
            fetchAllArticles={fetchAllArticles}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default ArticlesItem;
