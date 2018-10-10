module.exports = app => {
  const { mongoose } = app

  const AttachmentSchema = new mongoose.Schema({
    extname: { type: String },
    url: { type: String },
    filename: { type: String },
    extra: { type: String },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date },
  })

  return mongoose.model('Attachment', AttachmentSchema)
}
