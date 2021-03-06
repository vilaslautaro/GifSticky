import Spinner from "components/Spinner/Spinner";
import { useRef, useEffect } from "react";
import ListOfGifs from "components/ListOfGifs";
import useGifs from "hooks/useGifs";
import useNearScreen from "hooks/useNearScreen";
import debounce from "just-debounce-it";
import { Helmet } from "react-helmet";
import SearchForm from "components/SearchForm";
import styled from "@emotion/styled";

const TitleSearch = styled.h3`
  color: #fff;
  text-align: start;
  text-transform: uppercase;
  font-size: 30px;
  margin: 30px 10px;
`;

const SearchResults = ({ params }) => {
  const { keyword, rating, type } = params;
  const { loading, gifs, setPage } = useGifs({ keyword, rating, type });
  const externalRef = useRef();
  const { isNearScreen } = useNearScreen({
    externalRef: loading ? null : externalRef,
    once: false,
  });
  const title = gifs ? decodeURI(keyword) : "";

  const debounceHandleNextPage = debounce(
    () => setPage((prevPage) => prevPage + 1),
    200
  );

  useEffect(() => {
    if (isNearScreen) debounceHandleNextPage();
  }, [debounceHandleNextPage, isNearScreen]);

  return (
    <>
      {loading ? (
        <>
          <Helmet>
            <title>Cargando...</title>
          </Helmet>
          <Spinner />
        </>
      ) : (
        <>
          <Helmet>
            <title>{title} | GifSticky</title>
            <meta
              name="description"
              content={decodeURI(keyword) + "| Codegif"}
            />
          </Helmet>
          <div>
            <SearchForm
              initialKeyword={keyword}
              initialRating={rating}
              initialType={type}
            />
          </div>
          <TitleSearch> {decodeURI(keyword)}</TitleSearch>
          <ListOfGifs gifs={gifs} />
          <div id="visor" ref={externalRef}></div>
        </>
      )}
    </>
  );
};

export default SearchResults;
