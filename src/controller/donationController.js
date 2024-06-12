const { Firestore } = require("@google-cloud/firestore");
const { createDonation, getDonationById, getAllDonations } = require('../model/donationModel');
const { getUserById } = require('../model/userModel');
const crypto = require('crypto');
const { error } = require("console");

const createDonationController = async (req, res) => {
    const { user_id, title, deskripsi, location } = req.body;
    const image = req.file.cloudStoragePublicUrl;
    const donation_id = crypto.randomUUID();

    const newDonation = {
        "donation_id": donation_id,
        "title": title,
        "deskripsi": deskripsi,
        "image": image,
        "location": location
    };

    try {
        await createDonation(donation_id, {user_id, ...newDonation });
        const user = await getUserById(user_id);
        if (!user) {
            return res.status(404).json({
                error: true,
                message: 'Pengguna tidak ditemukan, tidak dapat membuat donasi!'
            });
        }

        return res.status(200).json({
            error: false,
            message: 'Donasi berhasil dibuat!',
            user: {
                user_id: user.user_id,
                username: user.username, 
                no_hp: user.no_hp,
                nama_lengkap: user.nama_lengkap,
                profile_img: user.profile_img,
                donation: newDonation
            }
        });
    } catch (e) {
        return res.status(500).json({
            error: true,
            message: 'Gagal membuat donasi: ' + e.message,
        });
    }
}

const getDonationByIdController = async (req, res) => {
    const { id } = req.params;

    try {
        const donation = await getDonationById(id);

        if (!donation) {
            return res.status(404).json({
                message: 'Donasi tidak ditemukan!'
            });
        }

        const user = await getUserById(donation.user_id);

        return res.status(200).json({
            message: 'Donasi berhasil diambil!',
            user: {
                user_id: user.user_id,
                no_hp: user.no_hp,
                nama_lengkap: user.nama_lengkap,
                donation: donation
            }
        });
    } catch (e) {
        return res.status(500).json({
            message: e.message,
        });
    }
}

const getAllDonationsController = async (req, res) => {
    try {
        const donations = await getAllDonations();

        return res.status(200).json({
            message: 'Semua donasi berhasil diambil!',
            donations: donations
        });
    } catch (e) {
        return res.status(500).json({
            message: e.message,
        });
    }
}

module.exports = { createDonationController, getDonationByIdController, getAllDonationsController }