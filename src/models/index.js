import { User, initUser, initUserAssociations } from './User';
import { Invitation, initInvitation, initInvitationAssociations } from './Invitation';

export let models;
const initModels = async (sequelize) => {
  // Initiate models
  await initUser(sequelize);
  await initInvitation(sequelize);

  // Initiate associations between models
  await initUserAssociations();
  await initInvitationAssociations();

  models = {
    User,
    Invitation
  };
};

export default initModels;
