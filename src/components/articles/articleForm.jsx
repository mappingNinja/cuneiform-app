import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import constant from "../../redux/constants/constant";
import { addArticles, editArticles } from "../../redux/actions/articleAction";

const ArticleForm = ({
  initialValues,
  buttonText,
  isUpdate,
  setIsOpen,
  fetchAllArticles,
}) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSlugChange = (e) => {
    const { name, value } = e.target;
    const lowercaseValue = value.toLowerCase();
    const slugValue = lowercaseValue.trim().replace(/\s+/g, "-") || "/";
    setValues({
      ...values,
      [name]: slugValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isUpdate) {
      dispatch(editArticles(values, fetchAllArticles));
    } else {
      dispatch(addArticles(values));
    }
    setValues({
      title: "",
      slug: "",
      category: "",
      description: "",
    });
    setIsOpen(false);
  };

  return (
    <div
      className={`${
        !isUpdate
          ? "d-flex justify-content-center align-items-center vh-100"
          : ""
      }`}
    >
      <div className={`${!isUpdate ? "article-container border" : ""}`}>
        <form className="article-form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={values?.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="slug" className="form-label">
              Slug <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="slug"
              value={values?.slug}
              onChange={handleSlugChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category <span className="text-danger">*</span>
            </label>
            <select
              className="form-control"
              name="category"
              value={values?.category || "Select Category"}
              onChange={handleChange}
              required
            >
              {!values?.category && <option disabled>Select Category</option>}
              <option>Food</option>
              <option>Education</option>
              <option>Businessmen</option>
              <option>Position</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description <span className="text-danger">*</span>
            </label>
            <textarea
              className="form-control"
              name="description"
              value={values?.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-secondary">
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArticleForm;
