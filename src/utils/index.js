export const isEmail = (email) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

export const setWithExpiry = (key, value, ttl) => {
  const now = new Date();
  if (!ttl) ttl = 60 * 60 * 1000; // 60 minutes
  const item = {
    value: value,
    expiry: now.getTime() + ttl
  };
  localStorage.setItem(key, JSON.stringify(item));
};

export const getWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};
export const timeConvert = (n) => {
  if (!n) return null;
  const hours = n / 60;
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.floor(minutes);
  const seconds = (minutes - rminutes) * 60;
  const rseconds = Math.round(seconds);
  return rhours + ':' + rminutes + ':' + rseconds;
};
export const secondConvert = (n) => {
  if (!n) return null;
  const hours = n / 3600;
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.floor(minutes);
  const seconds = (minutes - rminutes) * 60;
  const rseconds = Math.round(seconds);
  return rhours + ':' + rminutes + ':' + rseconds;
};
