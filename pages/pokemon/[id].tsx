import PokemonCard from "@/components/PokemonCard";
import { GetServerSideProps } from "next";

async function fetchData(id: string) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();
  return data;
}

const IdPage = ({ data }: { data: any }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {data && <PokemonCard pokemon={data} />}
    </div>
  );
};

export default IdPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const data = await fetchData(id as string);

  return {
    props: {
      data,
    },
  };
};
