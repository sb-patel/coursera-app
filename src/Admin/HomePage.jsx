import { useContext } from "react";
import { AuthContext } from "../App";



const HomePage = () => {
    const { isLoggedIn } = useContext(AuthContext);

    if(!isLoggedIn){
        return <p>You must be logged in to view this page.</p>;
    }

    return (
        <div>
            <p>This is Admin Home Page !</p>
        </div>
    );
};

export default HomePage;