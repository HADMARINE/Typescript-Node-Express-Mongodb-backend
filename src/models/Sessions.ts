import mongoose, { model, Schema, Document, Model } from 'mongoose';
import Authorization from '@util/Authorization';
import error from '@error';

export interface SessionInterface {
  token: string;
  user: Schema.Types.ObjectId;
}

export interface SessionDocument extends Document, SessionInterface {
  registerToken(token: string): Promise<void>;
}

const SessionSchema: Schema = new Schema({
  token: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
});

SessionSchema.methods.registerToken = async function (
  token: string,
): Promise<void> {
  await Authorization.token.verify(token);
  try {
    await SessionModel.create({ token });
  } catch (e) {
    error.db.create('Session');
  }
};

const SessionModel = model<SessionDocument>('Session', SessionSchema);

export default SessionModel;