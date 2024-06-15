const { Firestore } = require("@google-cloud/firestore");
const { createSell, getSellById, getAllSells, getSellsByUserId, searchSellsByTitle, getAllSellsbyid, deleteSellsbyid } = require('../model/sellModel');
const { getUserById } = require('../model/userModel');
const crypto = require('crypto');

const createSellController = async (req, res) => {
    const { user_id, title, deskripsi, harga, expire } = req.body;
    const sell_img = req.file.cloudStoragePublicUrl;
    const sell_id = crypto.randomUUID();

    const newSell = {
        "sell_id": sell_id,
        "title": title,
        "deskripsi": deskripsi,
        "sell_img": sell_img,
        "harga": harga,
        "expire": expire
    };

    try {
        await createSell(sell_id, { user_id, ...newSell });
        const user = await getUserById(user_id);
        if (!user) {
            return res.status(404).json({
                error: true,
                message: 'Pengguna tidak ditemukan, gagal membuat penjualan!'
            });
        }

        return res.status(200).json({
            error: false,
            message: 'Penjualan berhasil dibuat!',
            user: {
                user_id: user.user_id,
                no_hp: user.no_hp,
                nama_lengkap: user.nama_lengkap,
                profile_img: user.profile_img,
                sell: newSell
            }
        });
    } catch (e) {
        return res.status(500).json({
            error: true,
            message: 'Gagal membuat penjualan: ' + e.message,
        });
    }
}

const getSellByIdController = async (req, res) => {
    const { id } = req.params;

    try {
        const sell = await getSellById(id);
        if (!sell) {
            return res.status(404).json({
                error: true,
                message: 'Penjualan tidak ditemukan!'
            });
        }

        const user = await getUserById(sell.user_id);
        if (!user) {
            return res.status(404).json({
                error: true,
                message: 'Pengguna yang terkait dengan penjualan ini tidak ditemukan!'
            });
        }

        return res.status(200).json({
            error: false,
            message: 'Penjualan berhasil diambil!',
            user: {
                user_id: user.user_id,
                no_hp: user.no_hp,
                nama_lengkap: user.nama_lengkap,
                profile_img: user.profile_img,
                sell
            }
        });
    } catch (e) {
        return res.status(500).json({
            error: true,
            message: e.message,
        });
    }
}

const getAllSellsController = async (req, res) => {
    try {
        const sells = await getAllSells();
        return res.status(200).json({
            error: false,
            message: 'Semua penjualan berhasil diambil!',
            sells
        });
    } catch (e) {
        return res.status(500).json({
            error: true,
            message: e.message,
        });
    }
}

const getSellsByUserIdController = async (req, res) => {
    const { user_id } = req.params;

    try {
        const sells = await getSellsByUserId(user_id);
        if (sells.length === 0) {
            return res.status(404).json({
                error: true,
                message: 'Tidak ada penjualan yang ditemukan untuk pengguna ini.'
            });
        }
        return res.status(200).json({
            error: false,
            message: 'Penjualan berhasil diambil!',
            sells
        });
    } catch (e) {
        return res.status(500).json({
            error: true,
            message: 'Error saat mencari penjualan: ' + e.message
        });
    }
}

const searchSellsByTitleController = async (req, res) => {
    const { title } = req.query;
    console.log(!title)
    if (!title) {
                return res.status(404).json({
                error: true,
                message: 'Penjualan tidak ditemukan!'
            });
    }

    try {
        const results = await searchSellsByTitle(title);
        return res.status(200).json({
            error: false,
            message: 'Penjualan ditemukan.',
            sells: results
        });
    } catch (e) {
        return res.status(500).json({
            error: true,
            message: 'Error saat mencari penjualan: ' + e.message
        });
    }
}

const getAllSellsbyidController = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        const sells = await getAllSellsbyid(id);
        
        return res.status(200).json({
            message: 'Semua penjualan berhasil diambil!',
            sells: sells
        });
    } catch (e) {
        return res.status(500).json({
            message: e.message,
        });

    }
}

const deleteSellsbyidController = async (req, res) => {
    const { id } = req.params;
    try {
        const sells = await deleteSellsbyid(id);
        
        return res.status(200).json({
            message: 'Penjualan berhasil dihapus!',
        });
    } catch (e) {
        return res.status(500).json({
            message: e.message,
        });

    }

}



module.exports = {
    createSellController,
    getSellByIdController,
    getAllSellsController,
    getSellsByUserIdController,
    searchSellsByTitleController,
    getAllSellsbyidController,
    deleteSellsbyidController
};
