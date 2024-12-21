import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router'
export default function Dashborad(){
    const navigate = useNavigate()
    function handleLogout(){
        localStorage.removeItem('token');
        navigate('/login');
    }
    return (
        <div>
            <h1>Dashboard</h1>
            <Button variant='info' onClick={handleLogout}>
                Logout
            </Button>
        </div>
    )
}