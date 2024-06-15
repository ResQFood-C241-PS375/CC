const { Firestore } = require("@google-cloud/firestore");
const db = new Firestore({ keyFilename: process.env.SERVICE_KEY });

async function createSell(id, data) {
    const sellsCollection = db.collection("sells");
    return sellsCollection.doc(id).set(data);
}

async function getSellById(user_id) {
    const donationRef = await db
        .collection("sells")
        .where("user_id", "==", user_id)
        .get();

    let data;
    donationRef.forEach((item) => {
        data = item.data();
    });
    return data;
}

async function getSellsByUserId(user_id) {
    const sellsRef = db.collection("sells");
    const snapshot = await sellsRef.where('user_id', '==', user_id).get();
    if (snapshot.empty) {
        console.log('Tidak ada penjualan yang ditemukan untuk pengguna ini.');
        return [];
    }
    const sells = [];
    snapshot.forEach(doc => {
        sells.push(doc.data());
    });
    return sells;
}

async function getAllSells() {
    const sellsRef = db.collection("sells");
    const snapshot = await sellsRef.get();
    const sells = [];
    snapshot.forEach(doc => {
        sells.push(doc.data());
    });
    return sells; 
}

async function searchSellsByTitle(titleQuery) {
    console.log(titleQuery)
    const sellsRef = db.collection("sells");
    const snapshot = await sellsRef.where('title', '>=', titleQuery).where('title', '<=', titleQuery + '\uf8ff').get();
    if (snapshot.empty) {
        console.log('Tidak menemukan apapun.');
        return [];
    }
    const results = [];
    snapshot.forEach(doc => {
        results.push(doc.data());
    });
    console.log(results);
    return results;
}

async function getAllSellsbyid (user_id){
    const donationRef = await db
        .collection("sells")
        .where("user_id", "==", user_id)
        .get();

    let data = [];
    donationRef.forEach((item) => {
        data.push(item.data());
        console.log(data);
    });
    return data;
}

async function deleteSellsbyid (user_id){
    const sellCollection = db.collection("sells").doc(user_id);
    const getSells = await sellCollection.get();

    if (!getSells .exists) {
        console.log("tidak ada data")
    }

    await sellCollection.delete();

    return true;
}

module.exports = { createSell, getSellById, getSellsByUserId, getAllSells, searchSellsByTitle, getAllSellsbyid, deleteSellsbyid };
