import express from 'express';
import { urlencoded, json } from 'body-parser';
import cors from 'cors';
import i18next from 'i18next';
import i18nextMiddleware from 'i18next-http-middleware';
import i18nextBackend from 'i18next-fs-backend';
import initDatabase from './src/config/database';
import initPassport from './src/config/passport';
import errorHandling from './src/middlewares/errorHandling';

// Routes
import authRoutes from './src/routes/authRoutes';
import userRoutes from './src/routes/userRoutes';
import invitationRoutes from './src/routes/invitationRoutes';

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

initPassport();

app.use(cors());

// app.use(express.static('public'));

i18next
  .use(i18nextBackend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    lookupQuerystring: 'lng',
    backend: {
      // eslint-disable-next-line no-path-concat
      loadPath: `${__dirname}/src/locales/{{lng}}/{{ns}}.json`,
      // eslint-disable-next-line no-path-concat
      addPath: `${__dirname}/src/locales/{{lng}}/{{ns}}.missing.json`
    },
    fallbackLng: 'en'
  });

app.use(
  i18nextMiddleware.handle(i18next)
);

(async () => {
  await initDatabase();

  // API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/invitations', invitationRoutes);

  app.use(errorHandling);

  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on port ${port}`);
  });
})();
