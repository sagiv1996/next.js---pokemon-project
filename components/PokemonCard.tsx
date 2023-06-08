import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";

interface Pokemon {
  name: string;
  height: number;
  weight: number;
  sprites: {
    other: {
      home: {
        front_default: string;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
}

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <Card sx={{ maxWidth: 600 }}>
      <CardMedia
        component="img"
        height="140"
        image={pokemon.sprites.other.home.front_default}
        alt={pokemon.name}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {pokemon.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Height: {pokemon.height}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Width: {pokemon.weight}
        </Typography>
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
          {pokemon.types.map((type, index) => (
            <Chip key={index} label={type.type.name} />
          ))}
        </div>
        <Button
          variant="outlined"
          onClick={handleBackClick}
          sx={{ marginTop: "1rem" }}
        >
          Back
        </Button>
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
