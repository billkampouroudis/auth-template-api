/* eslint-disable no-unused-vars */
import fs from 'fs';
import path from 'path';
import sequelizeFixtures from 'sequelize-fixtures';
import initModels, { models } from '../models/index';
import { sequelize, loadDb } from './sequelize';

const loadFixtures = async () => {
  const fixturesPath = '../models/fixtures';
  const directoryPath = path.join(__dirname, fixturesPath);
  fs.readdir(directoryPath, async (err, files) => {
    try {
      if (err) {
        throw err;
      }

      await sequelizeFixtures.loadFile(
        path.join(directoryPath, files.filter((file) => file === 'index.js')[0]),
        models
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Could not load fixtures because there is already data in the database');
    }
  });
};

const initDatabase = async () => {
  try {
    await loadDb();
    await initModels(sequelize);

    // * IMPORTANT: The following lines will make changes to the database.
    // * In case you want to delete everything in the database and pass { force: true } in the sync function.
    await sequelize.sync();
    await loadFixtures();
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
  }
};

export default initDatabase;
