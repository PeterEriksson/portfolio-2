export default {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      description: "Title of the project",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "demo",
      title: "Demo",
      type: "image",
      description: "Preferably a gif showcasing the project",
      options: {
        hotspot: true,
      },
    },
    {
      /* add condition(?), max amount of words. See skillDescription */
      name: "summary",
      title: "Summary",
      type: "text",
    },
    {
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [{ type: "reference", to: { type: "skill" } }],
    },
    {
      name: "linkToBuild",
      title: "Link To Build",
      type: "url",
    },
    {
      name: "linkToGithub",
      title: "Link To Github",
      type: "url",
    },
  ],
};
