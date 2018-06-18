import { auth, firestore, functions } from './firebase';

const ON_COLOR = '#393';
const OFF_COLOR = '#27b';

chrome.browserAction.setBadgeText({text: 'ON'});
chrome.browserAction.setBadgeBackgroundColor({color: ON_COLOR});

chrome.browserAction.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage();
});
