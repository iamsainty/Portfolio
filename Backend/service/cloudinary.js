const { v2 } = require('cloudinary');
const fs = require('fs').promises;

const cloudinary = v2;

// Configuration
cloudinary.config({
    cloud_name: process.env.cloudinary_cloud_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_api_secret
});

const uploadImage = async (localurl) => {
    try {
        if (!localurl) {
            return null;
        }
        // uploading file on cloudinary
        const response = await cloudinary.uploader.upload(localurl, {
            resource_type: 'image'
        });
        // file is uploaded successfully
        return response;
    } catch (error) {
        await fs.unlink(localurl).catch(err => console.error(`Failed to delete local file: ${err.message}`));
        return null;
    }
}

module.exports = { uploadImage };
