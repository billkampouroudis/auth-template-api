/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
import { hashSync, compareSync, genSaltSync } from 'bcrypt';
import { dataTypes } from '../config/sequelize';
import rules from '../constants/validation';
import { Invitation } from './Invitation';

const { STRING, INTEGER } = dataTypes;

const hashPassword = (password, salt) => hashSync(password, salt);

let User;
const initUser = async (sequelize) => {
  User = sequelize.define(
    'users',
    {
      id: {
        type: INTEGER.UNSIGNED,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: {
        type: STRING(45),
        allowNull: false
      },
      lastName: {
        type: STRING(45),
        allowNull: false
      },
      email: {
        type: STRING(rules.defaultMaxLength),
        allowNull: false,
        unique: true
      },
      mobileNumber: {
        type: STRING(rules.defaultMaxLength)
      },
      password: {
        type: STRING(60),
        allowNull: false
      },
      salt: {
        type: STRING()
      },
      avatar: {
        type: STRING()
      }
    },
    {
      hooks: {
        beforeCreate: (user) => {
          const salt = genSaltSync(10);

          user.salt = salt;
          user.password = hashPassword(user.password, salt);
        }
      }
    }
  );

  User.prototype.validPassword = function validPassword(password) {
    return compareSync(password, this.password);
  };

  User.prototype.hashPassword = hashPassword;
};

const initUserAssociations = async () => {
  User.hasMany(Invitation);
};

export {
  User,
  initUser,
  initUserAssociations
};
