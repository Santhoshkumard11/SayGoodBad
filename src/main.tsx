import { Devvit, useState } from "@devvit/public-api";
import { Home } from "./components/Home.js";
import { NewStory } from "./components/NewStory.js";
import { MyStory } from "./components/MyStory.js";
import { HowToPlay } from "./components/HowToPlay.js";
import { LeaderboardPage } from "./components/Leaderboard.js";

Devvit.configure({
  redditAPI: true,
  redis: true,
});

// -------- CUSTOM POST TYPE --------
Devvit.addCustomPostType({
  name: "SayGoodBad",
  description: "Create stories, track progress, and compete with others!",
  render: (context) => {
    const [page, setPage] = useState("Home");

    const renderCurrentPage = () => {
      if (page === "home") {
        return <Home setCurrentPage={setPage} context={context} />;
      }
      if (page === "addnewstory") {
        return <NewStory setCurrentPage={setPage} context={context} />;
      }
      if (page === "mystories") {
        return <MyStory setCurrentPage={setPage} context={context} />;
      }
      if (page === "howtoplay") {
        return <HowToPlay setCurrentPage={setPage} context={context} />;
      }
      if (page === "leaderboard") {
        return <LeaderboardPage setCurrentPage={setPage} context={context} />;
      }

      return <Home setCurrentPage={setPage} context={context} />;
    };
    return (
      <zstack height="100%" width="100%" alignment="middle center">
        <image
          url="background.png"
          imageHeight={512}
          imageWidth={750}
          width="100%"
          height="100%"
          resizeMode="fill"
        />
        <hstack height="100%" width="100%" alignment="middle center">
          {renderCurrentPage()}
        </hstack>
      </zstack>
    );
  },
});

export default Devvit;
