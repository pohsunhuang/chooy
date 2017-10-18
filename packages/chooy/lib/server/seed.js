import Users from 'meteor/vulcan:users';
import { newMutation } from 'meteor/vulcan:core';
import Topics from '../modules/topics/collection';

const seedData = [
  {
    names: ['apple'],
    locale: 1,
    description: `It's a fruit. Delicious!`,
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
  },
  {
    names: ['phone', 'cell phone', 'cellular phone', 'mobile phone'],
    locale: 1,
    description: `You can use it to call somebody.`,
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
  },
  {
    names: ['cup'],
    locale: 1,
    description: `Container for liquid. You can use it to drink.`,
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
  },
  {
    names: ['house'],
    locale: 1,
    description: `A building you can live in.`,
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
  },
  {
    names: ['job', 'occupation'],
    locale: 1,
    description: `Occupation of you`,
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
  },
  {
    names: ['hair style', 'hairstyle'],
    locale: 1,
    description: `Shape, color, length, the overall looks of your hair.`,
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
  },
  {
    names: ['hobby', 'avocation'],
    locale: 1,
    description: `Things you like to do at your free time.`,
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
  },
  {
    names: ['pineapple'],
    locale: 1,
    description: `Yet another fruit.`,
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
  },
  {
    names: ['apple'],
    locale: 2,
    description: `Same fruit for another region.`,
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
  },
  {
    names: ['Computer', 'PC'],
    locale: 1,
    description: `Machine which compute lots of things fast.`,
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
