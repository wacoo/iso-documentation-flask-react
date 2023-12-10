import { useDispatch, useSelector } from "react-redux";
import { fetchDocuments, fetchDocumentsBy } from "../feature/document/documentSlice";
import { useEffect, useState } from "react";
import Table from "./Table";

const HomeContent = () => {

  const [searchType, setSearchType] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

  const documents = useSelector((state) => state.documents.documents) ?? [];
  console.log("Documents have changed:", documents);
  const columns = ['Title', 'Category', 'Revision no.', 'Department', 'Document'];
  let data = [];
  if (Array.isArray(documents) && documents.length > 0) {
    data = documents.map((doc) => ({
      Title: doc.title,
      Category: doc.category,
      'Revision no.': doc.revision_no,
      Department: doc.department,
      Document: <button type="button">Download</button>,
      description: doc.description
    }));
  }

  const handleSearch = (event) => {
    event.preventDefault();
    dispatch(fetchDocumentsBy({ 'searchType': searchType, 'searchValue': searchValue }));
  }

  return (
    <div className="home-content-wrapper">
      <div className="input">
        <form action="" onSubmit={handleSearch}>
          <select name="search_by" id="search_by" onChange={(e) => setSearchType(e.target.value)} value={searchType}>
            <option value="title">Title</option>
            <option value="category">Category</option>
            <option value="department">Department</option>
            <option value="id">Document ID</option>
          </select>
          <div className="search-bar">
            <input type="text" name="search_bar" id="search_bar" placeholder="Search..." onChange={(e) => setSearchValue(e.target.value)} />
            <button type="submit">Search</button>
          </div>
        </form>
      </div>
      {data.length > 0 && <Table columns={columns} data={data} />}
    </div>
  );
}

export default HomeContent;