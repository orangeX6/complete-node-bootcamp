const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// # Get All documents from Model ############
exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    // EXECUTE QUERY
    const doc = await features.query;
    // const doc = await features.query.explain();

    const modelName = Model.modelName.toLowerCase().concat('s');

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: doc.length,
      data: { [modelName]: doc },
    });
  });

// # Get document from Model ############
exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id); // `query` is an instance of `Query`
    if (popOptions) query = query.populate(popOptions);

    const doc = await query;
    // const doc = await Model.findOne({ _id: req.params.id });
    if (!doc) return next(new AppError(`No doc found with that ID`, 404));

    const modelName = Model.modelName.toLowerCase();
    res.status(200).json({
      status: 'success',
      data: { [modelName]: doc },
    });
  });

// # Update document from Model ############
exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    const modelName = Model.modelName.toLowerCase();
    res.status(201).json({
      status: 'success',
      data: { [modelName]: doc },
    });
  });

// # Update document from Model ############
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) return next(new AppError(`No doc found with that ID`, 404));

    const modelName = Model.modelName.toLowerCase();

    res.status(200).json({
      status: 'success',
      data: { [modelName]: doc },
    });
  });

// # Delete document from Model ############
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    const modelName = Model.modelName.toLowerCase();
    if (!doc)
      return next(new AppError(`No ${modelName} found with that ID`, 404));

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
