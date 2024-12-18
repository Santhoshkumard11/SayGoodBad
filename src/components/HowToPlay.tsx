import { Devvit } from "@devvit/public-api";

export const HowToPlay = ({ setCurrentPage, context }) => {
  return (
    <vstack gap="medium" alignment="top">
      <text size="large" weight="bold">
        ℹ️ How to Play
      </text>
      <text size="small">
        1. Add New Story: Start a new story by adding its opening content.
      </text>
      <text size="small">
        2. My Stories: View the stories you have created.
      </text>
      <text size="small">
        3. Leaderboard: Check rankings based on story contributions.
      </text>
      <text size="small">4. Expand stories, get creative, and enjoy!</text>
      <button
        onPress={() => {
          setCurrentPage("home");
        }}
        appearance="secondary"
      >
        🔙 Back to Home
      </button>
    </vstack>
  );
};
