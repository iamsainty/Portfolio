const express = require("express");
const Project = require("../models/Projects");
const { uploadProjectPreview } = require("../service/cloudinary");
const router = express.Router();

router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/techproject/:tech", async (req, res) => {
    try {
        const tech = req.params.tech;
        const projects = await Project.find({ technologies: { $in: [tech] } });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.post("/newproject", async (req, res) => {
  try {
    const {
      title,
      description,
      technologies,
      startdate,
      enddate,
      status,
      liveurl,
      githuburl,
      blogurl,
    } = req.body;

    const localPath = req.file ? path.resolve(req.file.path) : null;
    let imageurl = null;

    if (localPath) {
      const uploadResponse = await uploadProjectPreview(localPath);
      if (uploadResponse) {
        imageurl = uploadResponse.secure_url;
        fs.unlinkSync(localPath); // Remove the file from local storage
      }
    }

    const newProject = new Project({
      title,
      description,
      technologies,
      startdate,
      enddate,
      status,
      liveurl,
      githuburl,
      imageurl,
      blogurl,
    });
    await newProject.save();
    res.json(newProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get a single project
router.get("/getproject/:id", async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.put("/updateproject/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const {
      title,
      description,
      technologies,
      startdate,
      enddate,
      status,
      liveurl,
      githuburl,
      blogurl,
    } = req.body;
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        $set: {
          title,
          description,
          technologies,
          startdate,
          enddate,
          status,
          liveurl,
          githuburl,
          blogurl,
        },
      },
      { new: true }
    );
    if (!updatedProject) {
      res.status(404).json({ message: "Project not found" });
    }
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/deleteproject/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await Project.findByIdAndDelete(id);
        res.json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;
