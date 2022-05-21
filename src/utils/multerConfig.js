import multer from 'multer';
import path from 'path';

/**
 * Creates the destination folder and saves the file in it
 * @param {String} destination The folder where the files will be saved
 * @returns The multer object that handles files in requests
 */
const multerConfig = (destination) => {
  const storage = multer.diskStorage({
    destination,
    filename(req, file, cb) {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
      const oldNamwWithoutExtension = file.originalname.replaceAll(' ', '_').replace(/\.[^/.]+$/, '');
      const oldNamwWithoutSpaces = oldNamwWithoutExtension.replaceAll(' ', '_');

      cb(null, `${oldNamwWithoutSpaces}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
  });

  return multer({ storage });
};

export default multerConfig;
