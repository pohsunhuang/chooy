import FormsUpload from 'meteor/vulcan:forms-upload';
import FormChips from '../../components/form/FormChips';

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
  
  photos: {
    label: 'Photos' ,
    type: Array,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    control: FormsUpload,
    form: {
      options: {
        preset: 'n5vxa3no',
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
    control: FormChips,
    form: {
      options: {
        placeholder: 'topics.enter.category',
      }
    },    
  },

  'categories.$': {
    type: String,
  },
  
  tips: {
    label: 'tips',
    type: Array,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
  },

  'tips.$': {
    type: Object,
  },

  'tips.$.how': {
    type: String,
    control: 'textarea',
    max: 256,
  },

  'tips.$.why': {
    type: String,
    control: 'textarea',
    max: 3000,
  },
  
  'tips.$.categories': {
    type: Array,
  },

  'tips.$.categories.$': {
    type: String,
  }
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
    optional: false,
    viewableBy: ['guests'],
    //TODO: on insert callback
  },

  ...TopicInfo,
};

export default schema;
