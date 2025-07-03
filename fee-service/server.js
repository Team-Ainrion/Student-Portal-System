const app = require("./app");

const PORT = process.env.PORT || 5006;
app.listen(PORT, () => {
  console.log(`💳 Fee Service running on port ${PORT}`);
});