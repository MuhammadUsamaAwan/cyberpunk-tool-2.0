module.exports = function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const sort = req.query.sort;
    const user = req.query.user;
    const text = req.query.text;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      if (user === undefined) {
        if (text === undefined) {
          if (sort === 'upvotes')
            results.results = await model
              .find({ private: false })
              .sort({ upvotes: -1 })
              .limit(limit)
              .skip(startIndex)
              .exec();
          else if (sort === 'oldest')
            results.results = await model
              .find({ private: false })
              .sort({ date: 1 })
              .limit(limit)
              .skip(startIndex)
              .exec();
          else
            results.results = await model
              .find({ private: false })
              .sort({ date: -1 })
              .limit(limit)
              .skip(startIndex)
              .exec();
        } else {
          if (sort === 'upvotes')
            results.results = await model
              .find({
                private: false,
                $or: [
                  { title: { $regex: text, $options: 'i' } },
                  { name: { $regex: text, $options: 'i' } },
                ],
              })
              .sort({ upvotes: -1 })
              .limit(limit)
              .skip(startIndex)
              .exec();
          else if (sort === 'oldest')
            results.results = await model
              .find({
                private: false,
                $or: [
                  { title: { $regex: text, $options: 'i' } },
                  { name: { $regex: text, $options: 'i' } },
                ],
              })
              .sort({ date: 1 })
              .limit(limit)
              .skip(startIndex)
              .exec();
          else
            results.results = await model
              .find({
                private: false,
                $or: [
                  { title: { $regex: text, $options: 'i' } },
                  { name: { $regex: text, $options: 'i' } },
                ],
              })
              .sort({ date: -1 })
              .limit(limit)
              .skip(startIndex)
              .exec();
        }
      } else {
        if (sort === 'upvotes')
          results.results = await model
            .find({ user })
            .sort({ upvotes: -1 })
            .limit(limit)
            .skip(startIndex)
            .exec();
        else if (sort === 'oldest')
          results.results = await model
            .find({ user })
            .sort({ date: 1 })
            .limit(limit)
            .skip(startIndex)
            .exec();
        else
          results.results = await model
            .find({ user })
            .sort({ date: -1 })
            .limit(limit)
            .skip(startIndex)
            .exec();
      }
      res.paginatedResults = results;
      next();
    } catch (e) {
      res.status(500).json({ msg: e.message });
    }
  };
};
