import React from 'react';
import classNames from 'classnames/bind';
import { Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

import styles from './SearchBox.module.scss';

const SearchBox = ({className}) => {
    const cx = classNames.bind(styles);
    const { Search } = Input;

    const suffix = (
        <AudioOutlined
            style={{
                fontSize: 16,
                color: '#1890ff',
            }}
        />
    );

    const onSearch = value => console.log(value);

    return (
        <div className={className}>
            <Search
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}
            />
        </div>
    );
}

export default SearchBox;
