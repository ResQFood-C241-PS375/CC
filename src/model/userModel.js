const { Firestore } = require("@google-cloud/firestore");
const db = new Firestore({keyFilename:process.env.SERVICE_KEY});

async function storeData(id, data) {
  const usersCollection = db.collection("users");
  return usersCollection.doc(id).set(data);
}

async function getUsers(username) {
  try {
    const usersRef = await db.collection("users");
    const userSnapshot = await usersRef.where("username", "==", username).get();
    // const passRef = await usersRef.where('username','==',username).get();
    // console.log(userSnapshot);
    return userSnapshot;

    // const documents = [];
    // getAll.forEach(doc => {
    //     const document = { id: doc.data().user_id, password: doc.data().password, data: doc.data() };
    //     documents.push(document);
    // })

    // console.log(getAll);
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getUserById(user_id) {
  const userRef = await db
    .collection("users")
    .where("user_id", "==", user_id)
    .get();

  let data;
  userRef.forEach((item) => {
    data = item.data();
  });
  return data;

}

async function updateProfil(id, newData) {
  const userRef = await db.collection("users").doc(id);

  if (newData.avatar_img === undefined) {
    throw new Error("avatar kosong");
  }

  await userRef.update(newData);
  // console.log(newData.avatar_image);

  // return updated
}

module.exports = { storeData, getUsers, getUserById, updateProfil };
