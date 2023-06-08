import { IconButton, List, ListItem } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";
import LaunchIcon from "@mui/icons-material/Launch";
import Link from "next/link";
import Layout from "@/Layout";
import axiosInstance from "@/axiosInstance";

type Result = {
  name: string;
  url: string;
};

export default () => {
  const [data, setData] = useState<Result[]>();
  const [isLoading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [endpointUrl, setEndpointUrl] = useState(
    `${axiosInstance.defaults.baseURL}/pokemon`
  );

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data: response, status } = await axios.get(endpointUrl);
    if (!response.results || status != 200) return;
    if (data) {
      setData([...data, ...response.results]);
    } else {
      setData(response.results);
    }
    setLoading(false);
    setEndpointUrl(response.next);
    if (response.count && data)
      setHasMore(data ? response.count > data.length : false);
  };

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No Loading data data</p>;

  return (
    <Layout>
      <InfiniteScroll
        loadMore={getData}
        hasMore={hasMore}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      >
        <List>
          {data?.map((result, index) => (
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
                  href={`/pokemon/${result.name}`}
                >
                  <LaunchIcon />
                </IconButton>
              }
            >
              {result.name}
            </ListItem>
          ))}
        </List>
      </InfiniteScroll>
    </Layout>
  );
};
