import { 
    SET_MARKDOWN, 
    GET_MARKDOWN, 
    DELETE_MARKDOWN, 
    EDIT_MARKDOWN 
} from './actions';
import { db } from '../models/db';

export const reducer = (state, action) => {
    switch (action.type) {
        case SET_MARKDOWN: {
            //check active element in elements, or set active first
            let id;
            if(state != null) {
                id = state.active;
                if( !(state.data.find(item => item.id === state.active)) ) {
                    id = action.payload[0].id;
                }
            } else {
                id = action.payload[0].id;
            }

            return {
                data: [
                    ...action.payload
                ],
                active: id
            };
            break;
        }
        case GET_MARKDOWN: {
            let id = action.payload.id;

            return {
                ...state,
                active: id
            }
            break;
        }
        case DELETE_MARKDOWN: {
            db.markdown.delete(state.active);
            return {
                data: [
                    ...state.data
                ]
            };
            break;
        }
        case EDIT_MARKDOWN: {
            let content = action.payload.content;
            db.markdown.where("id").equals(state.active).modify({content: content});
            return {
                ...state
            };
            break;
        }
        default: {
            return state;
        }
    }
}