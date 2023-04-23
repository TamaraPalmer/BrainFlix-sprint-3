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
  const newVideo = {
    id: uuidv4(),
    title: req.body.title,
    image: "https://i.imgur.com/i6S8m7I.jpg",
    description: req.body.description,
  };

  const videos = readVideosFile();
  videos.push(newVideo);
  fs.writeFileSync("./data/videos.json", JSON.stringify(videos));

  const newVideoDetails = {
    id: newVideo.id,
    title: newVideo.title,
    image: newVideo.image,
    description: newVideo.description,
    comments: [
      {
        id: "35bba08b-1b51-4153-ba7e-6da76b5ec1b9",
        name: "Micheal Lyons",
        comment:
          "They BLEW the ROOF off at their last event, once everyone started figuring out they were going. This is still simply the greatest opening of an event I have EVER witnessed.",
        likes: 0,
        timestamp: 1628522461000,
      },
      {
        id: "091de676-61af-4ee6-90de-3a7a53af7521",
        name: "Gary Wong",
        comment:
          "Every time I see him shred I feel so motivated to get off my couch and hop on my board. He’s so talented! I wish I can ride like him one day so I can really enjoy myself!",
        likes: 0,
        timestamp: 1626359541000,
      },
      {
        id: "66b7d3c7-4023-47f1-a02c-520c9ca187a6",
        name: "Theodore Duncan",
        comment:
          "How can someone be so good!!! You can tell he lives for this and loves to do it every day. Every time I see him I feel instantly happy! He’s definitely my favorite ever!",
        likes: 0,
        timestamp: 1626011132000,
      },
    ],
  };

  const videoDetails = readVideoDetailsFile();
  videoDetails.push(newVideoDetails);
  fs.writeFileSync("./data/video-details.json", JSON.stringify(videoDetails));

  res.status(201).json(newVideo);
});

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
