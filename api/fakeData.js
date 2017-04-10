export let links = [
  {
    id: `1`,
    url: `http://reddit.com/r/javascript`,
    description: `All about the JavaScript programming language.`,
  },
  {
    id: `2`,
    url: `http://reddit.com/r/reactjs`,
    description:
      `A community for learning and developing web applications using React by Facebook.`,
  },
]

export let tags = [
  {
    id: `1`,
    name: `javascript`,
  },
  {
    id: `2`,
    name: `react`,
  },
]

export let edges = [
  { id: `1`, link_id: `1`, tag_id: `1` },
  { id: `2`, link_id: `2`, tag_id: `1` },
  { id: `3`, link_id: `2`, tag_id: `2` },
]
