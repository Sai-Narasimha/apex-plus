const SaveData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const GetData = (key) => {
  try {
    let data = localStorage.getItem(key);
    data = JSON.parse(data);
    return data;
  } catch (err) {
    return err;
  }
};

export { SaveData, GetData };
