// lib/session.ts

import { SessionOptions } from 'iron-session';

const sessionOptions: SessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: 'myapp_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

declare module 'iron-session' {
  interface IronSessionData {
    user?: { id: number; username: string };
  }
}

export function withSessionRoute(handler: any, sessionOptions: SessionOptions) {
  return withSessionRoute(handler, sessionOptions);
}

export function withSessionSsr(handler: any, sessionOptions: SessionOptions) {
  return withSessionSsr(handler, sessionOptions);
}
