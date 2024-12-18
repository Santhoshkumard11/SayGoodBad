import { Devvit } from "@devvit/public-api";

export const Home = ({ setCurrentPage, context }) => {
  return (
    <vstack gap="medium" alignment="middle center" borderColor="transparent">
      <text size="xxlarge" weight="bold">
        Welcome to Say Good Bad
      </text>
      <text size="small" weight="regular">
        Create new stories, track your progress, and compete on the leaderboard!
      </text>
      <button
        onPress={() => {
          setCurrentPage("addnewstory");
        }}
        appearance="primary"
      >
        ➕ Add New Story
      </button>
      <button
        onPress={() => {
          setCurrentPage("mystories");
        }}
        appearance="secondary"
      >
        📚 My Stories
      </button>
      <button
        onPress={() => {
          setCurrentPage("leaderboard");
        }}
        appearance="secondary"
      >
        🏆 Leaderboard
      </button>
      <button
        onPress={() => {
          setCurrentPage("howtoplay");
        }}
        appearance="secondary"
      >
        ℹ️ How to Play
      </button>
    </vstack>
  );
};
