const { Firestore } = require("@google-cloud/firestore");
const db = new Firestore({ keyFilename: process.env.SERVICE_KEY });

async function createDonation(id, data) {
    console.log(data)
    const donationsCollection = db.collection("donations");
    return donationsCollection.doc(id).set(data);
}

async function getDonationById(donation_id) {
    const donationRef = await db
        .collection("donations")
        .where("donation_id", "==", donation_id)
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

module.exports = { createDonation, getDonationById, getAllDonations };
