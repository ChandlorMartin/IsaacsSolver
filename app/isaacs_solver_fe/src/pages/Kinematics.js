// src/pages/Kinematics.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

function KinematicsPage() {
    const location = useLocation();

    // Check if the current path is '/Kinematics/AverageSpeed'
    const isKinematicsPage = location.pathname === '/Kinematics';

    return (
        <div>
            {isKinematicsPage && <h1>Kinematics Page</h1>}
            {isKinematicsPage && <Link to="/Kinematics/AverageSpeed">Average Speed</Link>}
            {!isKinematicsPage && <Outlet />}
        </div>
    );
}

export default KinematicsPage;
