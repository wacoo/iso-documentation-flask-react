import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "./Table";
import { addCategory, fetchCategories } from "../feature/category/categorySlice";

const Category = () => {
    const [catInput, setCatInput] = useState('');
    const [msg, setMsg] = useState('');
    const [notifClass, setNotifClass] = useState('no_notif');
    const [notifId, setNotifId] = useState('no_notif');
    const [load, setLoad] = useState(false);
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories) ?? [];
    const categoriesPostRes = useSelector((state) => state.categories.catPostRes) ?? {};

    const user = sessionStorage.getItem('user');
    let access_level = 0;
    if (user) {
        access_level = JSON.parse(user)?.access_level;
    }

	console.log(access_level);
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        if (load) {
            if (categoriesPostRes.message) {
                setMsg(categoriesPostRes.message);
                setNotifClass('notification');
                setNotifId('success');
            } else if (categoriesPostRes.error) {
                setMsg(categoriesPostRes.error);
                setNotifClass('notification');
                setNotifId('failure');
            }
            setLoad(false);
            dispatch(fetchCategories());
            resetResult();
        }

    }, [dispatch, categoriesPostRes]);

    const columns = ['Name', 'Action'];
    const data = Array.isArray(categories) && categories.map((category) => ({
        Name: category.name,
        Action: <button type="button">Update</button>,
    }));

    // console.log(data);

    const handleSubmit = (value, e) => {
        e.preventDefault();
        dispatch(addCategory({ 'name': value }));
        setLoad(true);
    }

    const resetResult = () => {
        setTimeout(() => {
            setMsg('');
            setNotifClass('no_notif');
            setNotifId('no_notif');
        }, 5000)
    }
    if (access_level < 1) {
        return (
            <div className="home-content-wrapper">
                <h1>ERROR:401</h1>
                <div className="input">
                    <p>Sorry, you don't have access to this page!</p>
                </div>
            </div>
        )
    }
    return (
        // <>
        <div className="home-content-wrapper">
            <div className={notifClass}>
                <p id={notifId}>{msg}</p>
            </div>
            <h1>CATEGORY</h1>
            <div className="input">
                <form action="">
                    <label htmlFor="name">Name</label>
                    <div className="one-input">
                        <input type="text" name="name" id="name" placeholder="Name" onChange={(e) => setCatInput(e.target.value)} />
                        <button type="submit" onClick={(e) => handleSubmit(catInput, e)} className="submit2">Add</button>
                    </div>
                </form>
            </div>
            {data.length > 0 && <Table columns={columns} data={data} />}
        </div>
        // </>
    );
}

export default Category;