import Layout from "@/Layout";
import PokemonCard from "@/components/PokemonCard";
import axios from "axios";
import { GetServerSideProps } from "next";

const NamePage = ({ data }: { data: any }) => {
  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        {<PokemonCard pokemon={data} />}
      </div>
    </Layout>
  );
};

export default NamePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { name } = context.query;
  const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

  return {
    props: {
      data,
    },
  };
};
