import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getAccessToken } from './index';

let auth = getAccessToken();

export function RequireAuth() {
	let location = useLocation();
	if (!auth) {
		return <Navigate to="/login" state={{ from: location }} />;
	}

	return <Outlet />;
}

export function NotRequireAuth() {
	let location = useLocation();
	if (auth) {
		return <Navigate to="/" state={{ from: location }} />;
	}

	return <Outlet />;
}