import React, {
    useEffect,
    useState
} from 'react';
import classNames from 'classnames/bind';
import { Input } from 'antd';

//ctx
import {useCustomContext} from '@frontend/context/ctx';
import {setSearched} from '@frontend/context/actions';

import styles from './SearchBox.module.scss';

const SearchBox = ({className}) => {
    const cx = classNames.bind(styles);
    const { Search } = Input;
    const [state, dispatch] = useCustomContext();
    const [data, setData] = useState([]);

    useEffect(() => {
        if(state != null) {
            setData(state.data);
        }
    }, [state]);

    const onSearch = value => {
        if(value.length > 0) {
            let searched = data.map((item) => {
                const regexp = new RegExp(value, 'g');
    
                const array = [...item.content.matchAll(regexp)];
                if(array.length > 0) {
                    return item.id;
                }
            }).filter(Boolean);
    
            dispatch(setSearched(searched));
        } else {
            dispatch(setSearched([]));
        }
    }

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
