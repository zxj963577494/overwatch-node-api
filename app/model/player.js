module.exports = app => {
  const { mongoose } = app
  const { Schema } = mongoose

  const PlayerSchema = new Schema(
    {
      playerId: { type: Number },
      teamId: { type: Number },
      handle: { type: String },
      name: { type: String },
      homeLocation: { type: String },
      familyName: { type: String },
      givenName: { type: String },
      nationality: { type: String },
      headshot: { type: String },
      birth: { type: Date },
      accounts: { type: Array },
      attributes: { type: Array },
      erased: { type: Boolean },
    },
    { collection: 'Player', timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
  )

  return mongoose.model('Player', PlayerSchema)
}
