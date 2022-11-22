module.exports = class {
  #queryString;
  constructor(query, queryStr) {
    this.query = query;
    this.#queryString = queryStr;
  }

  filter() {
    // 1A - Filtering
    const queryObj = { ...this.#queryString };
    ['page', 'sort', 'limit', 'fields'].forEach((el) => delete queryObj[el]);

    // 1B - Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = JSON.parse(
      queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
    );

    this.query = this.query.find(queryStr);
    return this;
  }

  sort() {
    const sortBy = this.#queryString?.sort?.split(',').join(' ');

    this.query = this.#queryString.sort
      ? this.query.sort(sortBy)
      : this.query.sort('-createdAt _id');
    return this;
  }

  limitFields() {
    const fields = this.#queryString.fields?.split(',').join(' ');

    this.query = this.#queryString?.fields
      ? this.query.select(fields)
      : this.query.select('-__v');
    return this;
  }

  paginate() {
    // skip //limit
    const page = +this.#queryString?.page || 1;
    const limit = +this.#queryString?.limit || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
};
