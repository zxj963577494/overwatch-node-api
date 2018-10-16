module.exports = app => {
  const { mongoose } = app
  const { Schema } = mongoose

  const MapSchema = new Schema(
    {
      name: { type: String },
      cnname: { type: String },
      gameModes: { type: Array },
      thumbnail: { type: String },
      type: { type: String },
      cntype: { type: String },
    },
    { collection: 'Map', timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
  )

  return mongoose.model('MapSchema', MapSchema)
}
