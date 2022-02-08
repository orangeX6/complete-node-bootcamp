// const catchAsync = (fn) => {
module.exports = (fn) => {
  console.log(fn);
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

// module.exports = (fn) => (req, res, next) => {
//   fn(req, res, next).catch(next);
// };
