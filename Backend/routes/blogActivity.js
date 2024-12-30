const express = require("express");
const validateUserToken = require("../middleware/validateUserToken");
const router = express.Router();
const { mysqlDB } = require("../config/aws-rds-mysql"); // Import the MySQL connection

router.post("/blog-like", validateUserToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { blogUrl } = req.body;

    const query =
      "INSERT INTO blog_activity (userId, blogUrl, activityType) VALUES (?,?,?)";

    mysqlDB.query(query, [userId, blogUrl, "Like"], (err, result) => {
      if (err) {
        console.log(err);

        return res
          .status(500)
          .json({ message: "Error occurred while liking the blog" });
      }
      return res
        .status(200)
        .json({ message: "Blog liked successfully", result });
    });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ message: "Error occurred while liking the blog", error });
  }
});

router.post("/blog-unlike", validateUserToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const { blogUrl } = req.body;

    const query =
      "DELETE FROM blog_activity WHERE userId = ? AND blogUrl = ? AND activityType = ?";

    mysqlDB.query(query, [userId, blogUrl, "Unlike"], (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error occurred while unliking the blog" });
      }
      return res
        .status(200)
        .json({ message: "Blog unliked successfully", result });
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error occurred while unliking the blog", error });
  }
});

router.post("/blog-comment", validateUserToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { blogUrl } = req.body;

    const query =
      "INSERT INTO blog_activity (userId, blogUrl, activityType) VALUES (?, ?, ?)";

    mysqlDB.query(query, [userId, blogUrl, "Comment"], (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error occurred while commenting the blog" });
      }
      return res
        .status(200)
        .json({ message: "Blog commented successfully", result });
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error occurred while commenting the blog", error });
  }
});

module.exports = router;
