/* eslint-disable import/no-cycle */
import { dataTypes } from '../config/sequelize';
import { User } from './User';

const { STRING, INTEGER, BOOLEAN } = dataTypes;

let Invitation;
const initInvitation = async (sequelize) => {
  Invitation = sequelize.define(
    'invitations',
    {
      id: {
        type: INTEGER.UNSIGNED,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
      },
      text: {
        type: STRING()
      },
      email: {
        type: STRING(),
        allowNull: false,
        unique: 'unique_creator_receiver' // A user can not invite the same person multiple times
      },
      registrationCode: {
        type: STRING(),
        allowNull: false,
        unique: true
      },
      status: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      userId: {
        type: INTEGER.UNSIGNED,
        allowNull: false,
        unique: 'unique_creator_receiver'
      }
    }
  );
};

const initInvitationAssociations = async () => {
  Invitation.belongsTo(User);
};

export {
  Invitation,
  initInvitation,
  initInvitationAssociations
};
