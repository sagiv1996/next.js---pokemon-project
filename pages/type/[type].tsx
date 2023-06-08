import { IconButton, Link, List, ListItem } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import axios from "axios";

import { GetServerSideProps } from "next";

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
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { type } = context.query;
  const { data } = await axios.get<Result>(
    `https://pokeapi.co/api/v2/type/${type}`
  );
  return {
    props: {
      data,
    },
  };
};
