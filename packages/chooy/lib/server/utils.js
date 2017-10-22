import { getSetting } from 'meteor/vulcan:lib';

const locales = getSetting('supportLocales', []);
  
export const getLocale = (acceptLanguageStr, query) => {
  let matchIndex = -1;

  if (!locales || (locales.length == 0)) {
    return {
      tag: 'en-US', region: 'en', redirectUrl: 'http://localhost',
    }
  }

  // Find if user provide locale inside URL query string
  if (query.locale) {
    matchIndex = _.indexOf(_.pluck(locales, 'region').map(region => {
        return region.toUpperCase();
      }), query.locale.toUpperCase());
  }

  // Otherwise, guess locale according to accept-language
  if ((matchIndex == -1) && acceptLanguageStr) {
    // Parse accept-language string and sort it by quality in descending order
    const acceptLanguages = _.sortBy(acceptLanguageStr.split(',').map((language) => {
      const parts = language.replace(/\s+/, '').split(';');
      return {
        tag: parts[0],
        quality: parts[1] ? parseFloat(parts[1].split('=')[1]) : 1.0
      };
    }).filter((language) => {
      if (!language || !language.tag) {
        return false;
      } else {
        return language;
      }
    }), 'quality').reverse();

    const tags = _.pluck(locales, 'tag').map(tag => {
      return tag.toUpperCase();
    });

    acceptLanguages.forEach((language) => {
      if (matchIndex == -1) {
        matchIndex = _.indexOf(tags, language.tag.toUpperCase());
      }
    });
  }

  if ( matchIndex != -1 ) {
    return locales[matchIndex];
  } else {
    return locales[0];
  }
};