const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

function readVideosFile() {
  const videosList = fs.readFileSync("./data/videos.json");
  const parsedData = JSON.parse(videosList);
  return parsedData;
}

function readVideoDetailsFile() {
  const videosList = fs.readFileSync("./data/video-details.json");
  const parsedData = JSON.parse(videosList);
  return parsedData;
}

// function writeVideosFile(data) {
//   const videosList = JSON.stringify(data, null, 2);
//   fs.writeFileSync("./data/videos.json", videosList);
// }

// GET all videos
router.get("/", (req, res) => {
  const videos = readVideosFile();
  res.json(videos);
});

// GET video by id
router.get("/:id", (req, res) => {
  const videos = readVideoDetailsFile();
  const video = videos.find((v) => v.id === req.params.id);
  if (!video) {
    res.status(404).json({ message: "Video not found" });
  } else {
    res.json(video);
  }
});

// POST a new video
router.post("/", (req, res) => {
  console.log(req.body);
  const newVideos = {
    id: uuidv4(),
    title: req.body.title,
    description: req.body.description,
  };

  const videos = readVideosFile;
  videos.push(newVideos);
  fs.writeFileSync(".data/videos.json", JSON.stringify(videos));

  res.status(201).json(newVideos);
});


// const videos = readVideoDetailsFile;
// videos.push(newVideos);
// fs.writeFileSync(".data/video-detail.json", JSON.stringify(videos));

// res.status(201).json(newVideos);
// });
//   videos.push(newVideo);
//   writeVideosFile(videos);
//   res.status(201).json(newVideo);
// });
// router.post("/videos-details", (req, res) => {
//   const videos = readVideosFile();
//   const newVideo = {
//     id: uuidv4(),
//     title: req.body.title,
//     channel: req.body.description,
//     thumbnail: req.body.thumbnail,
//     videoUrl: req.body.videoUrl,
//   };
//   videos.push(newVideo);
//   writeVideosFile(videos);
//   res.status(201).json(newVideo);
// });
module.exports = router;
