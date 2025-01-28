const express = require("express");
const validateUserToken = require("../middleware/validateUserToken");
const supabase = require("../config/supabase-db");
const router = express.Router();

router.post("/blog-comment", validateUserToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { blogUrl } = req.body;

    // Insert blog activity (comment)
    const { data, error } = await supabase
      .from("blog_activity")
      .insert([{ userId, blogUrl, activityType: "Comment" }]);

    if (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Error occurred while commenting on the blog" });
    }
    
    return res
      .status(200)
      .json({ message: "Blog commented successfully", data });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error occurred while commenting on the blog", error });
  }
});

module.exports = router;
