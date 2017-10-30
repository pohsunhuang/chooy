import Users from 'meteor/vulcan:users';
import { newMutation } from 'meteor/vulcan:core';
import Topics from '../modules/topics/collection';

const seedData = [
  {
    names: ['apple'],
    locale: 'en',
    photos: [
      [
        {
          bytes: 64442,
          height: 660,
          secure_url: "https://res.cloudinary.com/dqajc7tpe/image/upload/c_fill,g_auto,h_660,q_auto,w_990/v1507130003/dvae5bltybqmic71gbnr.jpg",
          transformation: "c_fill,g_auto,h_660,q_auto,w_990",
          url: "http://res.cloudinary.com/dqajc7tpe/image/upload/c_fill,g_auto,h_660,q_auto,w_990/v1507130003/dvae5bltybqmic71gbnr.jpg",
          width: 990,
        },
        {
          bytes: 9235,
          height: 220,
          secure_url: "https://res.cloudinary.com/dqajc7tpe/image/upload/c_fill,g_auto,h_220,q_auto,w_330/v1507130003/dvae5bltybqmic71gbnr.jpg",
          transformation: "c_fill,g_auto,h_220,q_auto,w_330",
          url: "http://res.cloudinary.com/dqajc7tpe/image/upload/c_fill,g_auto,h_220,q_auto,w_330/v1507130003/dvae5bltybqmic71gbnr.jpg",
          width: 330,
        }
      ],
    ],
    categories: ['fruit', 'food'],
    tips: [{how: '', why: '', categories: ['all', 'beginner']}, {how: '', why: '', categories: ['all', 'pro']}],
  },
  {
    names: ['phone', 'cell phone', 'cellular phone', 'mobile phone'],
    locale: 'en',
    photos: [
      [
        {
          bytes: 95184,
          height: 660,
          secure_url: "https://res.cloudinary.com/dqajc7tpe/image/upload/c_fill,g_auto,h_660,q_auto,w_990/v1507130079/c2jkslsozautfx5d5vg8.jpg",
          transformation: "c_fill,g_auto,h_660,q_auto,w_990",
          url: "http://res.cloudinary.com/dqajc7tpe/image/upload/c_fill,g_auto,h_660,q_auto,w_990/v1507130079/c2jkslsozautfx5d5vg8.jpg",
          width: 990,
        },
        {
          bytes: 13222,
          height: 220,
          secure_url: "https://res.cloudinary.com/dqajc7tpe/image/upload/c_fill,g_auto,h_220,q_auto,w_330/v1507130079/c2jkslsozautfx5d5vg8.jpg",
          transformation: "c_fill,g_auto,h_220,q_auto,w_330",
          url: "http://res.cloudinary.com/dqajc7tpe/image/upload/c_fill,g_auto,h_220,q_auto,w_330/v1507130079/c2jkslsozautfx5d5vg8.jpg",
          width: 330,
        },
      ],
    ],
    categories: [],
    tips: [],    
  },
  {
    names: ['cup'],
    locale: 'en',
    photos: [
      [
        {
          bytes: 41509,
          height: 660,
          secure_url: "https://res.cloudinary.com/dqajc7tpe/image/upload/c_fill,g_auto,h_660,q_auto,w_990/v1507131022/pwtjs2zdy0camlbd0drj.jpg",
          transformation: "c_fill,g_auto,h_660,q_auto,w_990",
          url: "http://res.cloudinary.com/dqajc7tpe/image/upload/c_fill,g_auto,h_660,q_auto,w_990/v1507131022/pwtjs2zdy0camlbd0drj.jpg",
          width: 990,
        },
        {
          bytes: 8409,
          height: 220,
          secure_url: "https://res.cloudinary.com/dqajc7tpe/image/upload/c_fill,g_auto,h_220,q_auto,w_330/v1507131022/pwtjs2zdy0camlbd0drj.jpg",
          transformation: "c_fill,g_auto,h_220,q_auto,w_330",
          url: "http://res.cloudinary.com/dqajc7tpe/image/upload/c_fill,g_auto,h_220,q_auto,w_330/v1507131022/pwtjs2zdy0camlbd0drj.jpg",
          width: 330,
        },
      ],
    ],
    categories: [],
    tips: [],    
  },
  {
    names: ['house'],
    locale: 'en',
    photos: [
      [
        {
          bytes: 64270,
          height: 660,
          secure_url: "https://res.cloudinary.com/dqajc7tpe/image/upload/c_fill,g_auto,h_660,q_auto,w_990/v1507130228/cnap1yhl2x9kpesghvab.webp",
          transformation: "c_fill,g_auto,h_660,q_auto,w_990",
          url: "http://res.cloudinary.com/dqajc7tpe/image/upload/c_fill,g_auto,h_660,q_auto,w_990/v1507130228/cnap1yhl2x9kpesghvab.webp",
          width: 990,
        },
        {
          bytes: 12650,
          height: 220,
          secure_url: "https://res.cloudinary.com/dqajc7tpe/image/upload/c_fill,g_auto,h_220,q_auto,w_330/v1507130228/cnap1yhl2x9kpesghvab.webp",
          transformation: "c_fill,g_auto,h_220,q_auto,w_330",
          url: "http://res.cloudinary.com/dqajc7tpe/image/upload/c_fill,g_auto,h_220,q_auto,w_330/v1507130228/cnap1yhl2x9kpesghvab.webp",
          width: 330,
        },
      ],
    ],
    categories: [],
    tips: [],    
  },
  {
    names: ['job', 'occupation'],
    locale: 'en',
    photos: [
      [
        {
          bytes: 62484,
          height: 660,
          secure_url: "https://res.cloudinary.com/dqajc7tpe/image/upload/c_fill,g_auto,h_660,q_auto,w_990/v1507131216/pohcclmtsc81jdmvo8wb.jpg",
          transformation: "c_fill,g_auto,h_660,q_auto,w_990",
          url: "http://res.cloudinary.com/dqajc7tpe/image/upload/c_fill,g_auto,h_660,q_auto,w_990/v1507131216/pohcclmtsc81jdmvo8wb.jpg",
          width: 990,
        },
        {
          bytes: 12244,
          height: 220,
          secure_url: "https://res.cloudinary.com/dqajc7tpe/image/upload/c_fill,g_auto,h_220,q_auto,w_330/v1507131216/pohcclmtsc81jdmvo8wb.jpg",
          transformation: "c_fill,g_auto,h_220,q_auto,w_330",
          url: "http://res.cloudinary.com/dqajc7tpe/image/upload/c_fill,g_auto,h_220,q_auto,w_330/v1507131216/pohcclmtsc81jdmvo8wb.jpg",
          width: 330,
        },
      ],
    ],
    categories: [],
    tips: [],    
  },
  {
    names: ['hair style', 'hairstyle'],
    locale: 'en',
    photos: [
      [
        {
          bytes: 54759,
          height: 660,
          secure_url: "https://res.cloudinary.com/dqajc7tpe/image/upload/c_fill,g_auto,h_660,q_auto,w_990/v1507130724/ndixa5bkinah6140eidf.jpg",
          transformation: "c_fill,g_auto,h_660,q_auto,w_990",
          url: "http://res.cloudinary.com/dqajc7tpe/image/upload/c_fill,g_auto,h_660,q_auto,w_990/v1507130724/ndixa5bkinah6140eidf.jpg",
          width: 990,
        },
        {
          bytes: 8579,
          height: 220,
          secure_url: "https://res.cloudinary.com/dqajc7tpe/image/upload/c_fill,g_auto,h_220,q_auto,w_330/v1507130724/ndixa5bkinah6140eidf.jpg",
          transformation: "c_fill,g_auto,h_220,q_auto,w_330",
          url: "http://res.cloudinary.com/dqajc7tpe/image/upload/c_fill,g_auto,h_220,q_auto,w_330/v1507130724/ndixa5bkinah6140eidf.jpg",
          width: 330,
        },
      ],
    ],
    categories: [],
    tips: [],    
  },
  {
    names: ['hobby', 'avocation'],
    locale: 'en',
    photos: [
      [
        {
          bytes: 80915,
          height: 660,
          secure_url: "https://res.cloudinary.com/dqajc7tpe/image/upload/c_fill,g_auto,h_660,q_auto,w_990/v1507130553/l41z9pccjwlpjx0o7eep.jpg",
          transformation: "c_fill,g_auto,h_660,q_auto,w_990",
          url: "http://res.cloudinary.com/dqajc7tpe/image/upload/c_fill,g_auto,h_660,q_auto,w_990/v1507130553/l41z9pccjwlpjx0o7eep.jpg",
          width: 990,
        },
        {
          bytes: 13719,
          height: 220,
          secure_url: "https://res.cloudinary.com/dqajc7tpe/image/upload/c_fill,g_auto,h_220,q_auto,w_330/v1507130553/l41z9pccjwlpjx0o7eep.jpg",
          transformation: "c_fill,g_auto,h_220,q_auto,w_330",
          url: "http://res.cloudinary.com/dqajc7tpe/image/upload/c_fill,g_auto,h_220,q_auto,w_330/v1507130553/l41z9pccjwlpjx0o7eep.jpg",
          width: 330,
        },
      ],
    ],
    categories: [],
    tips: [],    
  },
  {
    names: ['pineapple'],
    locale: 'en',
    photos: [
      [
        {
          bytes: 82426,
          height: 660,
          secure_url: "https://res.cloudinary.com/dqajc7tpe/image/upload/c_fill,g_auto,h_660,q_auto,w_990/v1507130051/kf1bc0bex954fita5fb0.jpg",
          transformation: "c_fill,g_auto,h_660,q_auto,w_990",
          url: "http://res.cloudinary.com/dqajc7tpe/image/upload/c_fill,g_auto,h_660,q_auto,w_990/v1507130051/kf1bc0bex954fita5fb0.jpg",
          width: 990,
        },
        {
          bytes: 15103,
          height: 220,
          secure_url: "https://res.cloudinary.com/dqajc7tpe/image/upload/c_fill,g_auto,h_220,q_auto,w_330/v1507130051/kf1bc0bex954fita5fb0.jpg",
          transformation: "c_fill,g_auto,h_220,q_auto,w_330",
          url: "http://res.cloudinary.com/dqajc7tpe/image/upload/c_fill,g_auto,h_220,q_auto,w_330/v1507130051/kf1bc0bex954fita5fb0.jpg",
          width: 330,
        },
      ],
    ],
    categories: [],
    tips: [],    
  },
  {
    names: ['apple'],
    locale: 'tw',
    photos: [
      [
        {
          bytes: 73025,
          height: 660,
          secure_url: "https://res.cloudinary.com/dqajc7tpe/image/upload/c_fill,g_auto,h_660,q_auto,w_990/v1507131468/twjgfkqkklvc0kglz0xg.jpg",
          transformation: "c_fill,g_auto,h_660,q_auto,w_990",
          url: "http://res.cloudinary.com/dqajc7tpe/image/upload/c_fill,g_auto,h_660,q_auto,w_990/v1507131468/twjgfkqkklvc0kglz0xg.jpg",
          width: 990,
        },
        {
          bytes: 11984,
          height: 220,
          secure_url: "https://res.cloudinary.com/dqajc7tpe/image/upload/c_fill,g_auto,h_220,q_auto,w_330/v1507131468/twjgfkqkklvc0kglz0xg.jpg",
          transformation: "c_fill,g_auto,h_220,q_auto,w_330",
          url: "http://res.cloudinary.com/dqajc7tpe/image/upload/c_fill,g_auto,h_220,q_auto,w_330/v1507131468/twjgfkqkklvc0kglz0xg.jpg",
          width: 330,
        },
      ],
    ],
    categories: [],
    tips: [],    
  },
  {
    names: ['Computer', 'PC'],
    locale: 'en',
    photos: [
      [
        {
          bytes: 50188,
          height: 660,
          secure_url: "https://res.cloudinary.com/dqajc7tpe/image/upload/c_fill,g_auto,h_660,q_auto,w_990/v1507131113/o6b9lo8pvkgblbyh9ixf.jpg",
          transformation: "c_fill,g_auto,h_660,q_auto,w_990",
          url: "http://res.cloudinary.com/dqajc7tpe/image/upload/c_fill,g_auto,h_660,q_auto,w_990/v1507131113/o6b9lo8pvkgblbyh9ixf.jpg",
          width: 990,
        },
        {
          bytes: 10098,
          height: 220,
          secure_url: "https://res.cloudinary.com/dqajc7tpe/image/upload/c_fill,g_auto,h_220,q_auto,w_330/v1507131113/o6b9lo8pvkgblbyh9ixf.jpg",
          transformation: "c_fill,g_auto,h_220,q_auto,w_330",
          url: "http://res.cloudinary.com/dqajc7tpe/image/upload/c_fill,g_auto,h_220,q_auto,w_330/v1507131113/o6b9lo8pvkgblbyh9ixf.jpg",
          width: 330,
        },
      ],
    ],
    categories: [],
    tips: [],
  },  
];

export const createSeedData = () => {
  if (Users.find().count() === 0) {
    Accounts.createUser({
      username: 'DemoUser',
      email: 'dummyuser@gmail.com',
      profile: {
        isDummy: true
      },
    });
  }

  const currentUser = Users.findOne();
  if( Topics.find().fetch().length === 0) {
    console.log('Create dummy topics.');
    seedData.forEach(document => {
      newMutation({
        action: 'topics.new',
        collection: Topics,
        document,
        currentUser,
        validate: false,
      });
    })
  }  
}
