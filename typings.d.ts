interface SanityBody {
  _createdAt: string;
  _id: string;
  _rev: string;
  _updatedAt: string;
}

interface Image {
  _type: "image";

  asset: {
    _ref: string;
    _type: "reference";
  };
}

export interface Skill extends SanityBody {
  _type: "skill";
  title: string;
  progress: number;
  image: Image;
  /* using dummyData... */
  /*   image: string; */
}

export interface Project extends SanityBody {
  _type: "project";
  title: string;
  image: Image;
  demo?: Image;
  // using dummyData...
  /* image: string;
  demo: string; */

  linkToBuild: string;
  linkToGithub: string;
  summary: string;
  technologies: Skill[];
}

export interface PageInfo extends SanityBody {
  _type: "pageInfo";
  address: string;
  backgroundInformation: string;
  email: string;
  role: string;
  heroImage: Image;

  profilePic?: Image;

  /* using dummyData... */
  /* profilePic: string;
  heroImage: string; */

  name: string;
  phoneNumber: string;
}

export interface Social extends SanityBody {
  _type: "social";
  title: string;
  url: string;
}

export interface SkillDescription extends SanityBody {
  _type: "skillDescription";
  text: string;
}
