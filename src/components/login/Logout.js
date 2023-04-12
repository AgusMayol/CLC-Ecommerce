import { signOut } from 'firebase/auth';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../../services/firebase/firebaseConfig';

const Logout = () => {

    const navigate = useNavigate();

    signOut(auth)
        .then(() => {
            navigate("/")
            console.log("Logged out")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
}

export default Logout;