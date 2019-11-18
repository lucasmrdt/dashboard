// import { model, Schema } from 'mongoose';
// import { isEmail, isMobilePhone } from 'validator';
// import { GAME_MODEL_NAME } from '@/Game/models';
// import { userCache } from '@/User/caches';
// import { gameListCache, gameItemCache } from '@/Game/caches';

// import { User, IUser } from '@/User/types';
// import { HookSyncCallback } from 'mongoose';

// export const UserSchema = new Schema<User>(
//   {
//     fbId: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     firstName: {
//       type: String,
//       required: true,
//     },
//     lastName: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       validate: isEmail,
//       required: true,
//       unique: true,
//     },
//     birthdate: {
//       type: Date,
//       required: true,
//     },
//     privacyPolicy: {
//       type: Boolean,
//       validate: (res: boolean) => res === true,
//       required: true,
//     },
//     termOfUse: {
//       type: Boolean,
//       validate: (res: boolean) => res === true,
//       required: true,
//     },
//     phone: {
//       type: String,
//       validate: (phone: string) => isMobilePhone(phone, 'fr-FR'),
//     },
//     address: {
//       type: String,
//     },
//     isAdmin: {
//       type: Boolean,
//       default: false,
//     },
//     nbBonusLeft: {
//       type: Number,
//       default: 0,
//     },
//     nbActivatedBonus: {
//       type: Number,
//       default: 0,
//     },
//     wonGames: [{ type: Schema.Types.ObjectId, ref: GAME_MODEL_NAME, required: true }],
//     vipGames: [{ type: Schema.Types.ObjectId, ref: GAME_MODEL_NAME, required: true }],
//   },
//   {
//     timestamps: true,
//   }
// );

// UserSchema.index({ UIMId: 1 });

// const onEvent: HookSyncCallback<IUser> = function(next: Function) {
//   /* eslint-disable no-invalid-this */
//   const { id, wonGames, vipGames } = this;
//   const wonGamesIsModified = this.isModified ? this.isModified('wonGames') : true;
//   const vipGamesIsModified = this.isModified ? this.isModified('vipGames') : true;

//   userCache.clear(id);
//   if (wonGamesIsModified || vipGamesIsModified) {
//     gameListCache.clear(id);

//     if (wonGamesIsModified) {
//       wonGames.forEach(game => gameItemCache.clear([id, game.slug]));
//     }
//     if (vipGamesIsModified) {
//       vipGames.forEach(game => gameItemCache.clear([id, game.slug]));
//     }
//   }
//   /* eslint-enable no-invalid-this */
//   next();
// };

// // ⚠️ Keep in mind that each action with user need to clear specific cache.
// //    Actualy we can only "save" an user. Add more hooks if you add other actions.
// UserSchema.pre('save', onEvent);

// export const USER_MODEL_NAME = 'User';
// export default model<IUser>(USER_MODEL_NAME, UserSchema);