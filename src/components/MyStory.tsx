import { Devvit, useAsync } from "@devvit/public-api";

export const MyStory = ({ setCurrentPage, context }) => {
  const userStoriesKey = `user_stories_${context.userId}`;
  const { stories, loading, error } = useAsync(
    async () => await context.redis.get(userStoriesKey)
  );

  console.log(`Trying to get stories for ${userStoriesKey}`, "-", stories);

  console.log("Error - ", error);

  const storyItems = stories
    ? stories.map((story, index) => (
        <vstack gap="small" key={index} alignment="top center">
          <text size="medium" weight="bold">
            {index + 1}. {story}
          </text>
          <text size="small">{story}</text>
        </vstack>
      ))
    : [
        <text key="nostories" size="small">
          You have not created any stories yet!
        </text>,
      ];

  return (
    <vstack gap="medium" alignment="start">
      <text size="large" weight="bold">
        📚 My Stories
      </text>
      {loading ? [<text>Loading ...</text>] : storyItems}
      <button onPress={() => setCurrentPage("home")} appearance="secondary">
        🔙 Back to Home
      </button>
    </vstack>
  );
};
