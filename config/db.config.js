  const mongoose = require("mongoose");
  mongoose.set('useFindAndModify', false);

  mongoose.connect('mongodb://localhost:27017/camagruAPI',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  err => {
    if (!err)
        console.log('MongoDB connected')
    else
        console.log('Error while connecting MongoDB : ' + JSON.stringify(err, undefined, 2))
})