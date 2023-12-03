import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "./Table";
import { fetchCategories } from "../feature/category/categorySlice";

const Category = () => {
    const dispatch = useDispatch();
    dispatch(fetchCategories());
    const categories = useSelector((state) => state.categories.categories) ?? [];
    useEffect(() => {
        console.log("Categories have changed:", categories);
    }, [categories]);
    
    const columns = ['name', 'Action'];
    const data = categories?.map((category) => ({
        name: category.name,
        Action: <button type="button">Update</button>,
      }))
    return (
        <div className="home-content-wrapper">
            <h1>Category</h1>
            <div className="input">
                <form action="">
                    <label htmlFor="name">Name</label>
                    <div className="one-input">
                        <input type="text"  name="name" id="name" placeholder="Name"/>
                        <button type="submit">Add</button>
                    </div>    
                </form>
            </div>
            {data.length > 0 && <Table columns={columns} data={data} />}
        </div>
    );
}

export default Category;