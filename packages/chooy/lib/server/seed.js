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
    tips: [],
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
    categories: ['electric equipment', 'electric appliance'],
    tips: [{
        how: '{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"paragraph","isVoid":false,"data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"Choose phone with ","marks":[]},{"object":"leaf","text":"multiple zoom lenses","marks":[{"object":"mark","type":"bold","data":{}}]}]}]}]}}',
        why: '{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"paragraph","isVoid":false,"data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"Multiple zoom lenses provide wider zoom range for different photo shooting situation.","marks":[]}]}]},{"object":"block","type":"paragraph","isVoid":false,"data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"For instance, shooting following things require very different zoom level:","marks":[]}]}]},{"object":"block","type":"ordered-list","isVoid":false,"data":{},"nodes":[{"object":"block","type":"list-item","isVoid":false,"data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"Portrait","marks":[]}]}]},{"object":"block","type":"list-item","isVoid":false,"data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"Landscape","marks":[]}]}]},{"object":"block","type":"list-item","isVoid":false,"data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"Flower","marks":[]}]}]}]},{"object":"block","type":"paragraph","isVoid":false,"data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"","marks":[]}]}]}]}}',
        objectives: ['Photo Shooting'],
        users: ['Photographer'],
      }, {
        how: '{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"paragraph","isVoid":false,"data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"Choose the one with ","marks":[]},{"object":"leaf","text":"big","marks":[{"object":"mark","type":"bold","data":{}}]},{"object":"leaf","text":", adjustable ","marks":[]},{"object":"leaf","text":"font size","marks":[{"object":"mark","type":"bold","data":{}}]},{"object":"leaf","text":".","marks":[]}]}]}]}}',
        why: '{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"paragraph","isVoid":false,"data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"People with ","marks":[]}]},{"object":"inline","type":"link","isVoid":false,"data":{"href":"https://en.wikipedia.org/wiki/Presbyopia"},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"Presbyopia","marks":[]}]}]},{"object":"text","leaves":[{"object":"leaf","text":" have difficulty reading small text, they require bigger display font.","marks":[]}]}]}]}}',
        objectives: [],
        users: ['Elder', 'Presbyopia'],
      }, {
        how: '{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"paragraph","isVoid":false,"data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"Choose the one with better ","marks":[]},{"object":"leaf","text":"shatterproof","marks":[{"object":"mark","type":"bold","data":{}}]},{"object":"leaf","text":" capability.","marks":[]}]}]}]}}',
        why: '{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"paragraph","isVoid":false,"data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"Elders, children and sportsman tend to drop their phone occasionally. Better shatterproof capability ensure longer service life.","marks":[]}]}]}]}}',
        objectives: ['Jogging', 'Exercising', 'Outdoor Activities'],
        users: ['Elder', 'Child', 'sportsman', 'jogger'],
      }, {
        how: '{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"paragraph","isVoid":false,"data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"Lighter","marks":[{"object":"mark","type":"bold","data":{}}]},{"object":"leaf","text":", the better.","marks":[]}]}]}]}}',
        why: '{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"paragraph","isVoid":false,"data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"Phones are getting bigger and bigger these days, and the weight increased accordingly.","marks":[]}]}]},{"object":"block","type":"paragraph","isVoid":false,"data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"Lighter phone provides better ","marks":[]},{"object":"leaf","text":"mobility","marks":[{"object":"mark","type":"italic","data":{}}]},{"object":"leaf","text":" and ","marks":[]},{"object":"leaf","text":"portability","marks":[{"object":"mark","type":"italic","data":{}}]},{"object":"leaf","text":".","marks":[]}]}]}]}}',
        objectives: ['General'],
        users: ['Everyone'],
      }, {
        how: '{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"paragraph","isVoid":false,"data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"Choose proper screen size for your particular usage.","marks":[]}]}]}]}}',
        why: '{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"paragraph","isVoid":false,"data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"Normally, bigger screen means better user experience, but also heavier and less portable.","marks":[]}]}]}]}}',
        objectives: ['General'],
        users: ['Everyone'],
      }, {
        how: '{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"paragraph","isVoid":false,"data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"Choose smaller phone.","marks":[]}]}]}]}}',
        why: '{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"paragraph","isVoid":false,"data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"Salesman sometimes have multiple numbers for different subjects. Smaller phones are usually cheaper and more portable.","marks":[]}]}]}]}}',
        objectives: ['Portability'],
        users: ['Salesman', 'Merchant'],
      }, {
        how: '{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"paragraph","isVoid":false,"data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"Choose the one with ","marks":[]}]},{"object":"inline","type":"link","isVoid":false,"data":{"href":"https://en.wikipedia.org/wiki/IP_Code"},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"IP68(dust/water proof)","marks":[]}]}]},{"object":"text","leaves":[{"object":"leaf","text":" certification.","marks":[]}]}]}]}}',
        why: '{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"paragraph","isVoid":false,"data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"Different activities require different level of waterproof and dust proof capability.","marks":[]}]}]},{"object":"block","type":"paragraph","isVoid":false,"data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"See ","marks":[]}]},{"object":"inline","type":"link","isVoid":false,"data":{"href":"https://en.wikipedia.org/wiki/IP_Code"},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"here","marks":[]}]}]},{"object":"text","leaves":[{"object":"leaf","text":" for more details. ","marks":[]}]}]}]}}',
        objectives: ['Swim', 'Scuba Dive', 'Surfing'],
        users: ['Diver', 'Swimmer', 'Surfer'],
      }, {
        how: '{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"paragraph","isVoid":false,"data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"Bigger storage capacity for more Apps/Photos/Games","marks":[]}]}]}]}}',
        why: '',
        objectives: ['General'],
        users: ['Everyone'],
      }, {
        how: '{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"paragraph","isVoid":false,"data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"At least ","marks":[]},{"object":"leaf","text":"1G RAM","marks":[{"object":"mark","type":"bold","data":{}}]},{"object":"leaf","text":" to run mainstream games smoothly.","marks":[]}]}]}]}}',
        why: '{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"paragraph","isVoid":false,"data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"More RAM means more computing power to run games with varies visual effect.","marks":[]}]}]}]}}',
        objectives: ['Gaming'],
        users: ['Gamer'],
      }, {
        how: '{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"paragraph","isVoid":false,"data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"Choose the one with longer battery life.","marks":[]}]}]}]}}',
        why: '',
        objectives: ['General', 'Gaming'],
        users: ['Gamer', 'Everyone'],
      }
    ],    
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
    categories: ['building', 'architecture'],
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
    categories: ['fruit', 'food'],
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
    categories: ['fruit', 'food'],
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
    categories: ['electric equipment'],
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
