module.exports = app => {
  const { mongoose } = app
  const { Schema } = mongoose

  const PlayerSchema = new Schema(
    {
      handle: { type: String },
      name: { type: String },
      homeLocation: { type: String },
      familyName: { type: String },
      givenName: { type: String },
      nationality: { type: String },
      headshot: { type: String },
      birth: { type: Date },
      accounts: { type: Array },
      heroes: [{ type: Schema.Types.ObjectId, ref: 'Hero' }],
    },
    { collection: 'Player', timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
  )

  return mongoose.model('Player', PlayerSchema)
}
