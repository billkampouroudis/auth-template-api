import STATUS from '../constants/statusCodes';
import { successResponse, errorResponse } from '../utils/response';
import { ForbiddenError } from '../constants/errors';
import {
  createSchema, getSchema, deleteSchema, listSchema,
  updateSchema
} from '../validation/invitationValidation';
import findError from '../utils/errorHandling';
import {
  createInvitationService, listInvitationsService, removeInvitationService,
  getInvitationService, updateInvitationService, sendInvitation
} from '../services/invitationService';
import { paginationValues } from '../utils/pagination';
import { prepareListOptions } from '../utils/prepareOptions';

export async function createInvitation(req, res) {
  try {
    const invitationData = { ...req.body };
    const { authenticatedUser } = req;

    await createSchema.validateAsync(invitationData);
    const invitation = await createInvitationService(invitationData);

    const mailOptions = {
      from: process.env.EMAIL_HOST_USER,
      to: req.body.email,
      subject: 'Πρόσκληση χρήστη',
      html: `
        <div style="font-size: 16px;">
          <p>
            Ο χρήστης ${authenticatedUser.lastName} ${authenticatedUser.firstName} σας προσκάλεσε στην εφαρμογή
          </p>

          </br>

          <a href="${process.env.WEB_APP_URL}/invitations/${invitation.registrationCode}">
            Πατήστε εδώ για να συνδεθείτε.
          </a>
        </div>
      `
    };

    await sendInvitation(mailOptions);

    return successResponse(STATUS.HTTP_200_OK, invitation, res);
  } catch (error) {
    return errorResponse(findError(error), res);
  }
}

export async function updateInvitation(req, res) {
  const invitationId = parseInt(req.params.invitationId, 10);

  try {
    await updateSchema.validateAsync(req.body);
    await updateInvitationService(invitationId, req.body);

    return successResponse(STATUS.HTTP_200_OK, {}, res);
  } catch (error) {
    return errorResponse(findError(error), res);
  }
}

export async function getInvitation(req, res) {
  try {
    const invitationId = parseInt(req.params.invitationId, 10);

    await getSchema.validateAsync({ invitationId });
    const invitation = await getInvitationService(invitationId);

    return successResponse(STATUS.HTTP_200_OK, invitation, res);
  } catch (error) {
    return errorResponse(findError(error), res);
  }
}

export async function listInvitations(req, res) {
  try {
    const {
      page, pageSize, filters, order
    } = req.query;
    const options = prepareListOptions(page, pageSize, filters, order);

    await listSchema.validateAsync(options);
    const results = await listInvitationsService(options);

    return successResponse(
      STATUS.HTTP_200_OK,
      results.rows,
      res,
      paginationValues(options.page, options.pageSize, results.count)
    );
  } catch (error) {
    return errorResponse(findError(error), res);
  }
}

export async function removeInvitation(req, res) {
  try {
    const { authenticatedInvitation } = req;
    const invitationId = parseInt(req.params.invitationId, 10);

    await deleteSchema.validateAsync({ invitationId });

    // If requested invitation is not an admin and tries to delete someone else
    if (authenticatedInvitation.roleId !== 1
      && authenticatedInvitation.id !== invitationId) {
      throw new ForbiddenError();
    }

    removeInvitationService(invitationId);

    return successResponse(STATUS.HTTP_200_OK, {}, res);
  } catch (error) {
    return errorResponse(findError(error), res);
  }
}
