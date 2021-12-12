import { Link } from 'react-router-dom'

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar-content">
                <div className="sidebar-title"> Card System </div>
                <ul>
                    <li>
                        <Link
                            to="/admin"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/admin/accounts"
                        >
                            Accounts
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/admin/vendors"
                        >
                            Vendors
                        </Link>
                    </li>
                    {/* <li>
                        <Link
                            to="/admin/vendorAddress"
                        >
                            Vendor Address
                        </Link>
                    </li> */}
                    <li>
                        <Link
                            to="/admin/cards"
                        >
                            Cards
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/admin/users"
                        >
                            Users
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/admin/client_cards"
                        >
                            Client Cards
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
