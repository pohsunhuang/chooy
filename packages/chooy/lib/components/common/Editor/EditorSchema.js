/*
* A schema to enforce that there's always a paragraph as the last block.
*/
import { Block } from 'slate';

const EditorSchema = {
 document: {
   last: { types: ['paragraph'] },
   normalize: (change, reason, { node, child }) => {
     switch (reason) {
       case 'last_child_type_invalid': {
         const paragraph = Block.create('paragraph')
         return change.insertNodeByKey(node.key, node.nodes.size, paragraph)
       }
     }
   }
 }
}

export default EditorSchema;
