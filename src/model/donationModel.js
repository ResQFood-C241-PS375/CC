const { Firestore } = require("@google-cloud/firestore");
const db = new Firestore({ keyFilename: process.env.SERVICE_KEY });

async function createDonation(id, data) {
    console.log(data)
    const donationsCollection = db.collection("donations");
    return donationsCollection.doc(id).set(data);
}

async function getDonationById(user_id) {
    const donationRef = await db
        .collection("donations")
        .where("user_id", "==", user_id)
        .get();

    let data;
    donationRef.forEach((item) => {
        data = item.data();
    });
    return data;
}

async function getAllDonations() {
    const donationsRef = await db.collection("donations").get();
    const donations = [];

    donationsRef.forEach(doc => {
        donations.push(doc.data());
    });

    return donations;
}

async function getAllDonationsbyid (user_id){
    const donationRef = await db
        .collection("donations")
        .where("user_id", "==", user_id)
        .get();

    let data = [];
    donationRef.forEach((item) => {
        data.push(item.data());
        console.log(data);
    });
    return data;
}

async function deleteDonationsbyid (user_id){
    const donationCollection = db.collection("donations").doc(user_id);
    const getDonations = await donationCollection.get();

    if (!getDonations .exists) {
        console.log("tidak ada data")
    }

    await donationCollection.delete();

    return true;
}



module.exports = { createDonation, getDonationById, getAllDonations, getAllDonationsbyid, deleteDonationsbyid };
