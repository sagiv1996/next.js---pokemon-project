import type { InferGetStaticPropsType, GetStaticProps } from "next";

type Repo = {
  count: number;
  next?: string;
  previous?: string;
};

export const getStaticProps: GetStaticProps<{
  repo: Repo;
}> = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon/");
  const repo = await res.json();
  return { props: { repo } };
};

export default function Index({
  repo,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return repo.count;
}
