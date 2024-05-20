import { useParams } from 'react-router-dom';
import useUserStatus from '../hooks/useUserStatus';

const ProfilePage = () => {
    const { username } = useParams();
    const { isLoggedIn, userData, isLoading } = useUserStatus();
    console.log(userData);
    if (isLoading) {
        return <p>Loading...</p>;
    } else if (!isLoggedIn) {
        return <p>Forbidden</p>;
    } else {
        return (<center>
            <p>Username: {username}</p>
            <p>Email: {userData.email}</p>
        </center>);
    }
};

export default ProfilePage;