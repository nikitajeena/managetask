import { useQuery, gql } from "@apollo/client";

const GET_LOCATIONS = gql`
  query Characters {
    characters (page: 2){
      results {
        episode {
          characters {
            id
            name
            image
          }
        }
      }
    }
  }
`;

export function DisplayQuery() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);
  if (loading) return <p> Loading.....</p>;
  if (error) return <p> Error: {error.message}</p>;

  const Char = data.characters.results;
  console.log(Char);

  return (
    <div>
      {Char.map((character) => (
        <div key={character.id}>
          {character.episode.map((episode) => (
            <div key={episode.id}>
              {episode.characters.map((char) => (
                <div key={char.id}>
                  <p> Name: {char.name} </p>
                  <img src={char.image} alt={char.name} />
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <>
      {" "}
      <h1>learning graphQL</h1>
      <DisplayQuery />{" "}
    </>
  );
}

export default App;
