import { useDispatch, useSelector } from "react-redux";
import { fetchDocuments } from "../feature/document/documentSlice";
import { useEffect } from "react";
import Table from "./Table";

const HomeContent = () => {

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
            'Revision no.': doc.revision,
            Department: doc.department,
            Document: <button type="button">Download</button>,
        }));
    }
    
    return (
        <div className="home-content-wrapper">
            <div className="input">
                <form action="">
                    <select name="search_by" id="search_by">
                        <option value="title">Title</option>
                        <option value="category">Category</option>
                        <option value="deparment">Department</option>
                        <option value="creator">Document creator</option>
                    </select>
                    <div className="search-bar">
                        <input type="text" name="search_bar" id="search_bar" placeholder="Search..."/>
                        <button type="submit">Search</button>
                    </div>
                </form>
            </div>
            {data.length > 0 && <Table columns={columns} data={data} />}
            {/* <table className="table-content">
                <thead>
                    <tr>
                        <td>Title</td>
                        <td>Category</td>
                        <td>Version</td>
                        <td>Deparment</td>
                        <td>User</td>
                        <td>Document</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Ricoh manual</td>
                        <td>Manual</td>
                        <td>2</td>
                        <td>Technique</td>
                        <td>Leikun</td>
                        <td><button>Donwload</button></td>
                    </tr>
                    <tr>
                        <td>Ricoh manual</td>
                        <td>Manual</td>
                        <td>2</td>
                        <td>Technique</td>
                        <td>Leikun</td>
                        <td><button>Donwload</button></td>
                    </tr>
                </tbody>
            </table> */}
        </div>
    );
}

export default HomeContent;