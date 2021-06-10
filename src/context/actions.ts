export const SET_MARKDOWN       = 'SET_MARKDOWN';
export const GET_MARKDOWN       = 'GET_MARKDOWN';
export const DELETE_MARKDOWN    = 'DELETE_MARKDOWN';
export const EDIT_MARKDOWN      = 'EDIT_MARKDOWN';

export const editMarkdown = (content) => {
    return {
        type: EDIT_MARKDOWN,
        payload: {
            content: content
        }
    }
}

export const deleteMarkdown = () => {
    return {
        type: DELETE_MARKDOWN
    }
}

export const getMarkdown = (id) => {
    return {
        type: GET_MARKDOWN,
        payload: {
            id: id
        }
    }
}