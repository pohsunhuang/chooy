import { getSetting } from 'meteor/vulcan:lib';

import { getLocale } from './utils';
import { createSeedData } from './seed';

Meteor.startup(function () {
  // Redirect user to local site if any according to accept-language  
  WebApp.connectHandlers.use('/', (req, res, next) => {
    if (req.url === '/' || (req.url.indexOf('/?locale=') === 0)) {
      const locale = getLocale(req.headers['accept-language'], req.query);
      if ( locale && locale.redirectUrl && (getSetting('locale', 'en').toUpperCase() !== locale.region.toUpperCase())) {
        res.writeHead(302,{
            Location: `${locale.redirectUrl}?locale=${locale.region}`,
          });
        res.end();
      } else {
        next();
      }
    } else {
      next();
    }
  });

  createSeedData();
});