import { IconButton, Link, List, ListItem } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import { GetServerSideProps } from "next";
import Layout from "@/Layout";
import axiosInstance from "@/axiosInstance";

type Result = {
  name: string;
  pokemon: [
    {
      pokemon: {
        name: string;
      };
    }
  ];
};

export default ({ data }: { data: Result }) => {
  return (
    <Layout>
      <List>
        {data.pokemon?.map((result, index) => (
          <ListItem
            key={index}
            disableGutters
            alignItems="center"
            divider
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                component={Link}
                href={`/pokemon/${result.pokemon.name}`}
              >
                <LaunchIcon />
              </IconButton>
            }
          >
            {result.pokemon.name}
          </ListItem>
        ))}
      </List>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { type } = context.query;

  const { data } = await axiosInstance.get<Result>(`/type/${type}`);
  return {
    props: {
      data,
    },
  };
};
