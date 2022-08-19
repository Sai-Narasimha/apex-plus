const SaveData = (key, data) => {
  let retrievedData = GetData(key) || [];
  localStorage.setItem(key, JSON.stringify([...retrievedData, data]));
};

const GetData = (key) => {
  try {
    let data = localStorage.getItem(key);
    data = JSON.parse(data);

    // console.log("retrieved data", data);
    return data;
  } catch (err) {
    // console.log("err in retrieving localStorage");
    return err;
  }
};

const DeleteData = (key)=>{
  localStorage.removeItem(key)
}
export { SaveData, GetData, DeleteData } ;
