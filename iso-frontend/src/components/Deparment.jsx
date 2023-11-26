
const Deparment = () => {
    return (

        <div className="home-content-wrapper">
            <h1>Department</h1>
            <div className="input">
            <form action="">
                    <label htmlFor="name">Name</label>
                    <div className="one-input">
                        <input type="text"  name="name" id="name" placeholder="Name"/>
                        <button type="submit">Add</button>
                    </div>    
                </form>    
            </div>
        </div>
    );
}

export default Deparment;