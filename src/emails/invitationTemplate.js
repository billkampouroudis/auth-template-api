const invitationTemplate = (req, invitation) => {
  const { authenticatedUser, t } = req;
  const { firstName, lastName } = authenticatedUser;
  const { registrationCode } = invitation;

  return `
    <div style="font-size: 16px;">
      <p>
        ${t('User {{lastName}} {{firstName}} invited you to the app.', { lastName, firstName })}
      </p>

      </br>

      <a href="${process.env.WEB_APP_URL}/invitations/${registrationCode}">
        Πατήστε εδώ για να συνδεθείτε.
      </a>
    </div>
`;
};

export default invitationTemplate;
