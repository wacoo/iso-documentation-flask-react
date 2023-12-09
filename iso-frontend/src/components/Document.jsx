import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDocument } from '../feature/document/documentSlice';
import { fetchCategories } from '../feature/category/categorySlice';
import { fetchDepartments } from '../feature/department/departmentSlice';

const Document = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatchWithDelay(fetchCategories, 10);
        await dispatchWithDelay(fetchDepartments, 500);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const dispatchWithDelay = (action, delay) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        dispatch(action())
          .then(resolve)
          .catch(reject);
      }, delay);
    });
  };

  const categories = useSelector((state) => state.categories.categories);
  const departments = useSelector((state) => state.departments.departments);

  const [data, setData] = useState({
    doc_title: '',
    doc_description: '',
    category_id: '',
    department_id: '',
    revision_no: '',
    doc_type: 'png',
    document: null,
  });

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const handleFileChange = (e) => {
    const file_name = e.target.files[0].name;
    const file_no_ext = file_name.split('.').slice(0, -1).join('.');
    setData({ ...data, document: e.target.files[0], doc_title: file_no_ext });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      ...data,
      category_id: categories.length > 0 ? categories[0].id : '',
      department_id: departments.length > 0 ? departments[0].id : ''
    };
    setData(updatedData);
    dispatch(addDocument(updatedData));
  };

  return (
    <div className="home-content-wrapper">
      <h1>Create Document</h1>
      <div className="input">
        <form onSubmit={handleSubmit} method="post">
          <label htmlFor="doc_title">Title</label>
          <input
            type="text"
            id="doc_title"
            name="doc_title"
            value={data.doc_title}
            onChange={handleInputChange}
          />
          <label htmlFor="doc_description">Description</label>
          <input
            type="text"
            id="doc_description"
            name="doc_description"
            value={data.doc_description}
            onChange={handleInputChange}
          />
          <label htmlFor="category">Category</label>
          <select
            name="category_id" // Updated name
            id="category"
            placeholder="Category"
            onChange={handleInputChange} // Updated event handler
          >
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <label htmlFor="department">Department</label>
          <select
            name="department_id" // Updated name
            id="department"
            placeholder="Department"
            onChange={handleInputChange} // Updated event handler
          >
            {departments.map((dept) => (
              <option value={dept.id} key={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
          <label htmlFor="revision_no">Revision No</label>
          <input
            type="number"
            id="revision_no"
            name="revision_no"
            value={data.revision_no}
            onChange={handleInputChange}
          />
          <label htmlFor="document">Document</label>
          <input
            type="file"
            id="document"
            name="document"
            onChange={handleFileChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Document;