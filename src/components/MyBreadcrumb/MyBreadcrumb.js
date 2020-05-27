import React from "react";
import { Link } from 'react-router';
import {Breadcrumb} from 'antd';

const routes = [
    {
        path: '/',
        breadcrumbName: 'Home',
    },
    {
        path: 'rides/',
        breadcrumbName: 'Rides',
    },
    {
        path: 'addride',
        breadcrumbName: 'home',
    },
    {
        path: 'first',
        breadcrumbName: 'first',
        children: [
            {
                path: '/general',
                breadcrumbName: 'General',
            },
            {
                path: '/layout',
                breadcrumbName: 'Layout',
            },
            {
                path: '/navigation',
                breadcrumbName: 'Navigation',
            },
        ],
    },
    {
        path: 'second',
        breadcrumbName: 'second',
    },
];
function itemRender(route, params, routes, paths) {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
        <span>{route.breadcrumbName}</span>
    ) : (
        <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
    );
}

return <Breadcrumb itemRender={itemRender} routes={routes} />;