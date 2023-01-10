export default {
  name: "skillDescription",
  title: "Skill Description",
  type: "document",
  fields: [
    {
      name: "text",
      /* name: "title", */
      title: "Stack Description",
      description: "Description of tech-skills (max 500 characters)",
      type: "text",
      validation: (Rule) => Rule.min(0).max(500),
    },
  ],
};
