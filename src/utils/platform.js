export const userDevices = [
  {device: 'Android', platform: /Android/},
  {device: 'iPhone', platform: /iPhone/},
  {device: 'iPad', platform: /iPad/},
  {device: 'Symbian', platform: /Symbian/},
  {device: 'Windows Phone', platform: /Windows Phone/},
  {device: 'Tablet OS', platform: /Tablet OS/},
  {device: 'Linux', platform: /Linux/},
  {device: 'Windows', platform: /Windows NT/},
  {device: 'Macintosh', platform: /Macintosh/}
];

export const userAgent = navigator.userAgent;

export function getPlatform() {
  for (let i in userDevices) {
    if (userDevices[i].platform.test(userAgent)) {
      return userDevices[i].device;
    }
  }

  return undefined;
}

export default {
  android: (/Android/).test(userAgent),
  ios: (/iPhone/).test(userAgent),
  web: !(/(iPhone)|(Android)/i).test(userAgent)
}
