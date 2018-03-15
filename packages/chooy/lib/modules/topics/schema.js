import FormChips from '../../components/form/FormChips';
import { getSetting } from 'meteor/vulcan:lib';

export const TopicInfo = {
  names: {
    label: 'Names' ,
    type: Array,
    optional: true,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    control: FormChips,
    form: {
      options: {
        placeholder: 'topics.enter.name',
      }
    },
    searchable: true,
  },

  'names.$': {
    type: String,
  },  

  tips: {
    label: 'Tips',
    type: Array,
    optional: true,    
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    control: 'FormTipsEditor',
  },

  'tips.$': {
    type: Object,
  },

  'tips.$.how': {
    type: String,
    optional: true,
  },

  'tips.$.why': {
    type: String,
    optional: true,
  },
  
  'tips.$.objectives': {
    type: Array,
    optional: true,
  },

  'tips.$.objectives.$': {
    type: String,
  },

  'tips.$.users': {
    type: Array,
    optional: true,
  },

  'tips.$.users.$': {
    type: String,
  },  

  photos: {
    label: 'Cover Art' ,
    type: Array,
    optional: true,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    control: 'FormImageUploader',
    form: {
      options: {
        type: 'cover',
      },
    },
  },

  'photos.$': {
    type: Object,
    blackbox: true,
    optional: true,
  },

  categories: {
    label: 'Categories' ,
    type: Array,
    optional: true,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    control: 'FormCategoriesChips',
    form: {
      options: {
        placeholder: 'topics.enter.category',
      }
    },    
  },

  'categories.$': {
    type: String,
  },  
};

const schema = {
  // default properties

  _id: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
  },

  createdAt: {
    type: Date,
    optional: true,
    viewableBy: ['guests'],
    onInsert: (document, currentUser) => {
      return new Date();
    }
  },

  userId: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    resolveAs: {
      fieldName: 'user',
      type: 'User',
      resolver: (root, args, context) => {
        return context.Users.findOne({ _id: root.userId }, { fields: context.Users.getViewableFields(context.currentUser, context.Users) });
      },
      addOriginalField: true
    }
  },

  locale: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    onInsert: () => {
      return getSetting('locale', 'en');
    }
  },

  ...TopicInfo,
};

export default schema;
