import { Devvit, useAsync } from "@devvit/public-api";

export const LeaderboardPage = ({ setCurrentPage, context }) => {
  const leaderboardKey = "story_leaderboard";
  const { leaderboardData, loading, error } = useAsync(
    async () => await context.redis.get(leaderboardKey)
  );

  console.log("Got the leaderboard - ", leaderboardData);

  const leaderboardItems =
    leaderboardData != undefined
      ? leaderboardData
          .sort((a, b) => b.score - a.score)
          .map((entry, index) => (
            <text key={index} size="small">
              {index + 1}. {entry.user}: {entry.score} points
            </text>
          ))
      : [
          <text key="noleaderboard" size="small">
            Leaderboard is empty. Be the first to contribute!
          </text>,
        ];

  return (
    <vstack gap="medium" alignment="top center">
      <text size="large" weight="bold">
        🏆 Leaderboard
      </text>
      {leaderboardItems}
      <button onPress={() => setCurrentPage("home")} appearance="secondary">
        🔙 Back to Home
      </button>
    </vstack>
  );
};
