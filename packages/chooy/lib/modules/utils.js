import { getSetting, Strings } from 'meteor/vulcan:lib';

export const getI18nMessage = (id, textOnly, values) => {
  const messages = Strings[getSetting('locale', 'en')] || {};
  let message = messages[id] || '';
  
  return message;
}

export const findMostRelevantString = (strings, cmpString) => {
  if(strings.length) {
    // find exact match first
    const re = new RegExp(`^${cmpString}$`, 'i');
    let matchStr = strings.find(str => {
      return re.test(str);
    });

    if (!matchStr) {
      // find prefix match
      const re = new RegExp(`^${cmpString}`, 'i');
      matchStr = strings.find(str => {
        return re.test(str);
      });
    }
  
    if (!matchStr) {
      return strings[0];
    } else {
      return matchStr;
    }
  } else {
    return '';
  }
}