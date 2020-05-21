module.exports = function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const sort = req.query.sort;
    const user = req.query.user;
    const text = req.query.text;
    const private = req.query.private;

    const startIndex = (page - 1) * limit;

    const results = {};

    if (user !== undefined && text === undefined && private !== 'true') {
      results.pages = Math.ceil(
        parseFloat(
          (await model.countDocuments({ user, private: false }).exec()) / limit
        )
      );
      results.total = await model
        .countDocuments({ user, private: false })
        .exec();
      let temp = await model.find({ user });
      let upvotes_no = 0;
      temp.forEach(element => {
        upvotes_no = element.upvotes.length + upvotes_no;
      });
      results.upvotes = upvotes_no;
    } else if (user !== undefined && text === undefined && private === 'true') {
      results.pages = Math.ceil(
        parseFloat((await model.countDocuments({ user }).exec()) / limit)
      );
      results.total = await model.countDocuments({ user }).exec();
      let temp = await model.find({ user });
      let upvotes_no = 0;
      temp.forEach(element => {
        upvotes_no = element.upvotes.length + upvotes_no;
      });
      results.upvotes = upvotes_no;
    } else if (user === undefined && text !== undefined)
      results.pages = Math.ceil(
        parseFloat(
          (await model
            .countDocuments({
              $or: [
                { title: { $regex: text, $options: 'i' } },
                { name: { $regex: text, $options: 'i' } },
              ],
            })
            .exec()) / limit
        )
      );
    else
      results.pages = Math.ceil(
        parseFloat((await model.countDocuments().exec()) / limit)
      );

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
        if (private === 'true') {
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
        } else {
          if (sort === 'upvotes')
            results.results = await model
              .find({ user, private: false })
              .sort({ upvotes: -1 })
              .limit(limit)
              .skip(startIndex)
              .exec();
          else if (sort === 'oldest')
            results.results = await model
              .find({ user, private: false })
              .sort({ date: 1 })
              .limit(limit)
              .skip(startIndex)
              .exec();
          else
            results.results = await model
              .find({ user, private: false })
              .sort({ date: -1 })
              .limit(limit)
              .skip(startIndex)
              .exec();
        }
      }
      res.paginatedResults = results;
      next();
    } catch (e) {
      res.status(500).json({ msg: e.message });
    }
  };
};
