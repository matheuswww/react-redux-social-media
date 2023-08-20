import React from 'react';
import { STATS_GET } from '../../api';
import useFetch from '../../Hooks/useFetch';
import Head from '../Helper/Head';
import Load from '../Helper/Load';
import Error from '../Helper/Error';
const UserStatsGraphs = React.lazy(() => import('./UserStatsGraphs'));

const UserStats = () => {
  const {data,error,load,request} = useFetch();

  React.useEffect(() => {
    (async function getData() {
      const {url,options} = STATS_GET();
      await request(url,options);
    }());
  },[request])

  if(load) return <Load />
  if(error) return <Error error={error}/>
  if(data)
  return (
    <React.Suspense fallback={<div></div>}>
      <Head title="Estatísticas" />
      <UserStatsGraphs data={data} />
    </React.Suspense>
  )
  else return null;
}

export default UserStats;