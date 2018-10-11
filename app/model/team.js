module.exports = app => {
  const { mongoose } = app
  const { Schema } = mongoose

  const TeamSchema = new Schema(
    {
      name: { type: String },
      abbreviatedName: { type: String },
      homeLocation: { type: String },
      primaryColor: { type: String },
      secondaryColor: { type: String },
      addressCountry: { type: String },
      description: { type: String },
      createdTime: { type: Date },
      status: { type: String },
      manager: { type: String },
      coaches: { type: String },
      rank: { type: String },
      logo: { type: String },
      icon: { type: String },
      accounts: { type: Array },
      players: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
      createAt: { type: Date, default: Date.now },
      updateAt: { type: Date },
    },
    { collection: 'Team' }
  )

  return mongoose.model('TeamSchema', TeamSchema)
}
