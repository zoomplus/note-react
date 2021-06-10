import React from 'react';
import classNames from 'classnames/bind';
import { Layout } from 'antd';

import styles from './Sidebar.module.scss';

const Sidebar = ({className, children}) => {
    const cx = classNames.bind(styles);
    const { Sider } = Layout;

    return (
        <Sider className={className} theme="light" width={400} style={{ padding: '50px' }}>
            { children }
        </Sider>
    );
}

export default Sidebar;
