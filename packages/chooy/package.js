Package.describe({
  name: 'chooy',
});

Package.onUse((api) => {
  api.use([
    'fourseven:scss@4.5.0',

    'vulcan:core',
    'vulcan:forms',
    'vulcan:forms-upload',
    'vulcan:accounts',
  ]);

  api.addFiles(['lib/stylesheets/main.scss'], ['client']);
  api.addAssets(['lib/assets/icons/icons.svg'], ['server', 'client']);

  api.mainModule('lib/server/main.js', 'server');
  api.mainModule('lib/client/main.js', 'client');
});
