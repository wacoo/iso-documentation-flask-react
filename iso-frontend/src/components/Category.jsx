import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "./Table";
import { addCategory, fetchCategories } from "../feature/category/categorySlice";

const Category = () => {
    const[catInput, setCatInput] = useState('');
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories) ?? [];
    const categoriesPostRes = useSelector((state) => state.categories.catPostRes) ?? {};

    console.log(categoriesPostRes);
    useEffect(() => {
        // dispatch(fetchCategories());
        console.log("Categories have changed:", categories);
    }, [dispatch]);
    
    const columns = ['name', 'Action'];
    const data = Array.isArray(categories) && categories.map((category) => ({
        name: category.name,
        Action: <button type="button">Update</button>,
      }))

    const handleSubmit = (value) => {
        dispatch(addCategory({'name': value}));
    }

    return (
        <div className="home-content-wrapper">
            <h1>Category</h1>
            <div className="input">
                <form action="">
                    <label htmlFor="name">Name</label>
                    <div className="one-input">
                        <input type="text"  name="name" id="name" placeholder="Name" onChange={(e) => setCatInput(e.target.value)}/>
                        <button type="submit" onClick={() => handleSubmit(catInput)} className="submit2">Add</button>
                    </div>    
                </form>
            </div>
            {data.length > 0 && <Table columns={columns} data={data} />}
        </div>
    );
}

export default Category;