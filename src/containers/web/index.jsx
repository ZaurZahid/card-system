import { Route, Routes } from 'react-router-dom'
import Home from '../../components/web/Home';
import Deposit from '../../components/web/Deposit';
import Profile from '../../components/web/Profile';
import Transactions from '../../components/web/Transactions';
import ClientCards from '../../components/web/ClientCards';
import Login from '../../components/web/Login';
import RecoverPassword from '../../components/web/RecoverPassword';
import NotFound from '../../components/web/NotFound';
import { RequireAuth } from '../../utils/ProtectRoute';
import { NotRequireAuth } from '../../utils/ProtectRoute';
import Layout from './Layout';

function index() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
                <Route element={<RequireAuth />}>
                    <Route path="/deposit" element={<Deposit />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/client_cards" element={<ClientCards />} />
                    <Route path="/mytransactions" element={<Transactions />} />
                </Route>
               
                <Route element={<NotRequireAuth />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/recover_password" element={<RecoverPassword />} />
                </Route>
            </Routes>
        </Layout>
    )
}

export default index
