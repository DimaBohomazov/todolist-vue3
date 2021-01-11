export const setLocalStorage = (id, items) => localStorage.setItem(String(id), JSON.stringify(items))

export const getLocalStorage = (id) => {
  const localStorageItems = localStorage.getItem(String(id));
  let items = []
  if (localStorageItems) {
    const parsedLocalStorageItems = JSON.parse(localStorageItems);
    items = parsedLocalStorageItems;
  }
  return items;
};