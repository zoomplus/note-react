import React, {
    useState,
    useEffect
} from 'react';
import classNames from 'classnames/bind';
import DOMPurify from 'dompurify';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Spin, Modal, Button } from 'antd';

//ctx
import {useCustomContext} from '@frontend/context/ctx';
import { editMarkdown, deleteMarkdown } from '@frontend/context/actions';

import styles from './Workspace.module.scss';

const marked = require("marked");

const Workspace = ({className}) => {
    const cx = classNames.bind(styles);
    const sanitizer = DOMPurify.sanitize;

    //ctx
    const [state, dispatch] = useCustomContext();

    //states
    const [edit, setEdit]   = useState(false);
    const [data, setData]   = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

    //fn
    const getMarkdownText = () => {
        let markedData = sanitizer(marked(data));
        return { __html: markedData };
    }

    const setMarkdownText = (value) => {
        //TODO обернуть debounce из underscore (или создать свою функцию)
        dispatch(editMarkdown(value));
    }

    const showModal = () => {
        setIsModalVisible(true);
    };
    
    const handleOk = () => {
        setIsModalVisible(false);
        dispatch(deleteMarkdown());
    };
    
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    //put content from db in data after update
    useEffect(() => {
        if(state != null) {
            let element = state.data.find((item) => item.id === state.active);
            if(element) {
                setData( element.content );
            }
        }
    }, [state]);

    if(!data) {
        return <div>
            <Spin />
        </div>
    }

    return (
        <>
            {
                edit
                ?
                <SimpleMDE value={data} onChange={setMarkdownText}/>
                :
                <div className={className} dangerouslySetInnerHTML={getMarkdownText()}></div>
            }
            
            <Button type="primary" onClick={showModal}>delete</Button>
            <Button type="primary" onClick={() => {setEdit(!edit)}}>{edit ? 'save' : 'edit'}</Button>

            <Modal title="Confirm action" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>You sure about your action?</p>
            </Modal>
        </>
    );
}

export default Workspace;
