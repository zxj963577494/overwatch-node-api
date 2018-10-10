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
      createAt: { type: Date, default: Date.now },
      updateAt: { type: Date },
    },
    { collection: 'Player' }
  )

  return mongoose.model('Player', PlayerSchema)
}
