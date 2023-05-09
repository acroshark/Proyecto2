const getTweetsController = async (req, res, next) => {
  try {
    throw new Error('Hubo un error');
    res.send({
      status: 'error',
      message: 'Not implemented',
    });
  } catch (error) {
    next(error);
  }
};

const newTweetController = async (req, res, next) => {
  console.log('usuario', req.auth);
  try {
    res.send({
      status: 'ok',
      message: 'nuevo tweet',
    });
  } catch (error) {
    next(error);
  }
};

const getSingleTweetController = async (req, res, next) => {
  console.log(req.headers);
  try {
    res.send({
      status: 'error',
      message: 'Not implemented',
    });
  } catch (error) {
    next(error);
  }
};

const deleteTweetController = async (req, res, next) => {
  try {
    res.send({
      status: 'error',
      message: 'Not implemented',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTweetsController,
  newTweetController,
  getSingleTweetController,
  deleteTweetController,
};
