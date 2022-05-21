import { is } from '@bill.kampouroudis/js-utils';
import crypto from 'crypto';
import { models } from '../models';
import { BadRequestError } from '../constants/errors';
import { addPagination } from '../utils/pagination';
import mailer from '../utils/promiseMailer';

export async function sendInvitation(mailOptions) {
  try {
    await mailer(mailOptions);
  } catch (err) {
    throw new BadRequestError(err);
  }

  return Promise.resolve();
}

/**
 * Creates a invitation with the given data
 * @param {object} invitationData
 * @returns {object} The newly created invitation
 */
export async function createInvitationService(invitationData) {
  const { Invitation } = models;

  const invitations = await Invitation.findOrCreate({
    where: {
      userId: invitationData.userId,
      email: invitationData.email
    },
    defaults: {
      ...invitationData,
      registrationCode: crypto.createHash('sha1').update(invitationData.email).digest('hex')
    }
  });

  const invitation = invitations[0].dataValues;

  if (!is.truthy(invitation)) {
    throw new BadRequestError();
  }

  return Promise.resolve(invitation);
}

/**
 * Updates a invitation with the given data
 * @param {number} invitationId
 * @param {object} invitationData
 * @returns {object} The updated invitation
 */
export async function updateInvitationService(invitationId, invitationData) {
  const { Invitation } = models;

  const invitation = await Invitation.findOne({ where: { id: invitationId } });

  if (!invitation) {
    throw new BadRequestError();
  }

  for (const key of Object.keys(invitationData)) {
    invitation[key] = invitationData[key];
  }

  invitation.save();

  return Promise.resolve(invitation);
}

/**
 * Finds a invitation based on the given invitation id
 * @param {number} invitationId
 * @returns {Promise<Array<object>>} The invitations that meet the requested criteria
 */
export async function getInvitationService(invitationId) {
  const { Invitation } = models;

  let invitations = {};
  try {
    invitations = await Invitation.findOne({
      where: { id: invitationId }
    });
  } catch (err) {
    throw new BadRequestError();
  }

  return Promise.resolve(invitations);
}

/**
 * Finds the invitations based on the given filters
 * @param {object} options
 * @param {number} options.page The requested page
 * @param {number} options.pageSize The requested size of each page
 * @param {object} options.filters The requested search filters
 * @param {array} options.order The requested order of the results
 * @returns {Promise<Array<object>>} The invitations that meet the requested criteria
 */
export async function listInvitationsService(options) {
  const { Invitation } = models;
  const {
    page, pageSize, filters, order
  } = options;

  const invitations = await Invitation.findAndCountAll({
    where: filters,
    order: order || [],
    distinct: true,
    subQuery: false,
    ...addPagination(page, pageSize)
  });

  return Promise.resolve(invitations);
}

export async function removeInvitationService(invitationId) {
  const { Invitation } = models;

  try {
    Invitation.destroy({
      where: { id: invitationId }
    });
  } catch (err) {
    throw new BadRequestError(err);
  }

  return Promise.resolve();
}
