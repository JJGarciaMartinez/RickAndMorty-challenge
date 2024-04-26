interface Character {
  id: number;
  name: string;
  image: string;
  episode: string[];
  url: string;
  created: string;
  species: string;
  status: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
}

export default Character;
