import React, {
    useState,
    useEffect
} from 'react';
import classNames from 'classnames/bind';
import { List, Divider, Spin } from 'antd';

//ctx
import { useCustomContext } from '@frontend/context/ctx';
import { getMarkdown } from '@frontend/context/actions';

import styles from './ListItem.module.scss';

const ListItem = ({className}) => {
    const cx = classNames.bind(styles);

    //ctx
    const [state, dispatch] = useCustomContext();

    //state
    const [data, setData] = useState([]);

    useEffect(() => {
        if(state != null) {
            setData(state.data.map((item) => {
                return {
                    name: item.name, 
                    id: item.id
                }
            }));
        }
    }, [state]);

    if(data.length <= 0) {
        return <div>
            <Spin />
        </div>
    }

    return (
        <div className={className}>
            <Divider orientation="center">Список заметок</Divider>
            <List
                size="large"
                bordered
                dataSource={data}
                renderItem={
                    item => {
                        let searched = false;
                        if(state.searched) {
                            let have = state.searched.find((itemState) => itemState === item.id);
                            if(have) {
                                searched = !!have;
                            }
                        }
                        return <List.Item onClick={() => { dispatch(getMarkdown(item.id)) }} style={( searched ? {backgroundColor: 'yellow'} : {backgroundColor: 'white'})}>
                            { item.name }
                        </List.Item>
                    }
                }
            />
        </div>
    );
}

export default ListItem;
