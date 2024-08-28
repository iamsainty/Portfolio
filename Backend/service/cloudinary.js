const { v2 } = require('cloudinary');
const fs = require('fs').promises;

const cloudinary = v2;

// Configuration
cloudinary.config({
    cloud_name: process.env.cloudinary_cloud_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_api_secret
});

// uploading blog covers
const uploadBlogCover = async (localurl) => {
    try {
        if (!localurl) {
            return null;
        }
        const response = await cloudinary.uploader.upload(localurl, {
            folder: 'coverimage',
            resource_type: 'image'
        });
        return response;
    } catch (error) {
        await fs.unlink(localurl).catch(err => console.error(`Failed to delete local file: ${err.message}`));
        return null;
    }
}

// uploading project previews
const uploadProjectPreview = async (localurl) => {
    try {
        if (!localurl) {
            return null;
        }
        const response = await cloudinary.uploader.upload(localurl, {
            folder: 'projectpreview',
            resource_type: 'image'
            });
            return response;
    } catch (error) {
        await fs.unlink(localurl).catch(err => console.error(`Failed to delete local file: ${err.message}`));
        return null;
    }
}


module.exports = { uploadBlogCover, uploadProjectPreview };
