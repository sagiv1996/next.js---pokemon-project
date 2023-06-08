import Layout from "@/Layout";
import axiosInstance from "@/axiosInstance";
import PokemonCard from "@/components/PokemonCard";
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
  const { data } = await axiosInstance.get(`/pokemon/${name}`);

  return {
    props: {
      data,
    },
  };
};
