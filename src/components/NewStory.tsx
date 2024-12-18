import {
  Devvit,
  JSONValue,
  useAsync,
  useForm,
  useState,
} from "@devvit/public-api";

export const NewStory = ({ setCurrentPage, context }) => {
  var [halfSentence, setHalfSentence] = useState("");
  const userStoriesKey = `user_stories_${context.userId}`;
  const { stories, loading, error } = useAsync(
    async () => await context.redis.get(userStoriesKey)
  );

  const newStoryForm = useForm(
    {
      fields: [
        {
          type: "string",
          name: "sentence",
          label: "Let your thoughts flow...",
        },
      ],
      acceptLabel: "Create",
      cancelLabel: "Cancel",
    },
    async (values) => {
      // onSubmit handler
      var currentStoryString = values.sentence;
      currentStoryString =
        currentStoryString === undefined || currentStoryString === null
          ? ""
          : currentStoryString;

      let currentStory: JSONValue = [currentStoryString];

      setHalfSentence(currentStoryString);
      if (currentStoryString.length < 5) {
        context.ui.showToast(
          "The length of the text should be more than 5 characters."
        );
        context.ui.showForm(newStoryForm);
      } else {
        if (stories === null || stories === undefined) {
          console.log("Adding a new story to", userStoriesKey, values.sentence);
          const createStoryResponse = await context.redis.set(
            userStoriesKey,
            JSON.stringify(currentStory)
          );

          context.ui.showToast("Created your first story");
          console.log("Create new story response - ", createStoryResponse);
        } else {
          console.log("Adding story to ", userStoriesKey, stories);
          currentStory = [...stories, values.sentence];
          const createStoryResponse = await context.redis.set(
            userStoriesKey,
            JSON.stringify(currentStory)
          );
          console.log("Create new story response - ", createStoryResponse);
          context.ui.showToast("Updating your story line-up!");
        }
      }
      console.log("Error - ", error);
    }
  );

  return (
    <vstack gap="medium" alignment="start">
      <text size="large" weight="bold">
        📝 Add a New Story
      </text>
      {loading
        ? [<text>Loading ...</text>]
        : [
            <button
              onPress={() => {
                context.ui.showForm(newStoryForm);
              }}
              appearance="secondary"
            >
              Create
            </button>,
          ]}

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
