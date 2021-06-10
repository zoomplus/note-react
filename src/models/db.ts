import Dexie from "dexie";
import {populate} from './populate';

const db = new Dexie('Markdown');

db.version(1).stores({
    markdown: '++id, name, content'
});

db.on("populate", populate);

export {
    db
};