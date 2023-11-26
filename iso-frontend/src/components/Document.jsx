import './Home.css'
const Document = () => {
    return (
        <div className="home-content-wrapper">
            <h1>Documents</h1>
            <div className="input">
                <form action="">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" placeholder="Title" />
                    <label htmlFor="title">Category</label>
                    <select name="category" id="category" placeholder="Category">
                        <option value="manual">Manual</option>
                        <option value="criteria">Criteria</option>
                        <option value="procedures">Procedure</option>
                        <option value="standard">Standard</option>
                    </select>
                    <label htmlFor="version">Version</label>
                    <input type="number" name="version" id="version" placeholder="Version" />
                    <label htmlFor="department">Department</label>
                    <select name="department" id="department" placeholder="Department">
                        <option value="manual">Manual</option>
                        <option value="criteria">Criteria</option>
                        <option value="procedures">Procedure</option>
                        <option value="standard">Standard</option>
                    </select>
                    <label htmlFor="document">Document</label>
                    <input type="file" id="document" name="document" />
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>

    );
}

export default Document;