import { GetServerSideProps, NextPage } from 'next'
import { TextContainer } from 'react-md'

interface Props {
  launch: {
    mission: string
    site: string
    timestamp: number
    rocket: string
  }
}
const LaunchPage: NextPage<Props> = ({ launch }) => {
  const date = new Date(launch.timestamp)
  return (
    <TextContainer>
      <main>
        <h1>Next SpaceX Launch: {launch.mission}</h1>
        <p>
          {launch.rocket} will take off from {launch.site} on {date.toDateString()}
        </p>
      </main>
    </TextContainer>
  )
}
export default LaunchPage

/*
 * More information about getServerSideProps:
 * https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
 */
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const response = await fetch('https://api.spacexdata.com/v3/launches/next')
  const nextLaunch = await response.json()
  return {
    props: {
      launch: {
        mission: nextLaunch.mission_name,
        site: nextLaunch.launch_site.site_name_long,
        timestamp: nextLaunch.launch_date_unix * 1000,
        rocket: nextLaunch.rocket.rocket_name,
      },
    },
  }
}
