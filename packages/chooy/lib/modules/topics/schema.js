import FormsUpload from 'meteor/vulcan:forms-upload';

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
      resolver: (movie, args, context) => {
        return context.Users.findOne({ _id: movie.userId }, { fields: context.Users.getViewableFields(context.currentUser, context.Users) });
      },
      addOriginalField: true
    }
  },
  
  names : {
    label: 'Names' ,
    type: Array,
    optional: false,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    searchable: true,
  },

  'names.$': {
    type: String,
  },  

  
  locale : {
    label: 'Locale' ,
    type: Number,
    optional: false,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
  },

  
  description : {
    label: 'Description' ,
    type: String,
    optional: false,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
  },

  
  photos : {
    label: 'Photos' ,
    type: Array,
    optional: false,
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

  
};

export default schema;
