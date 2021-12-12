import { Route, Routes } from 'react-router-dom'
import Dashboard from '../../components/admin/Dashboard';
import Accounts from '../../components/admin/Accounts';

import AdminLayout from './Layout';
import { RequireAuth } from './../../utils/ProtectRoute';
import NotFound from './../../components/web/NotFound';
import ClientCard from '../../components/admin/ClientCard';
import Users from '../../components/admin/Users';
import Vendors from '../../components/admin/Vendors';
import Cards from '../../components/admin/Cards';

function index() {
    return (
        <AdminLayout>
            <Routes>
                <Route element={<RequireAuth />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/accounts" element={<Accounts />} />
                    <Route path="/cards" element={<Cards />} />
                    <Route path="/client_cards" element={<ClientCard />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/vendors" element={<Vendors />} />
                    {/* <Route path="/vendorsAddress" element={<VendorsAddress />} /> */}
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </AdminLayout>
    )
}

export default index
