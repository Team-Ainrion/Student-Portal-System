const app = require("./app");

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`🎓 Academic Service running on port ${PORT}`);
});
