import { useQuery } from '@apollo/client';
import { HELLO_QUERY } from './graphql/queries/hello.query';

function App() {
  const { data, loading, error } = useQuery(HELLO_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <p>{data.hello}</p>;
}
export default App
