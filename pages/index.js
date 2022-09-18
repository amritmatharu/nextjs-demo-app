import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";
const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};
// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  //GetData from APP
  const client = await MongoClient.connect(
    "mongodb+srv://amritkr:waheguru@cluster0.cp44usm.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const collectionDB = db.collection("meetups");
  const allmeetups = await collectionDB.find().toArray();
  console.log(allmeetups);
  client.close();
  return {
    props: {
      meetups: allmeetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 1, // In seconds
  };
}
export default HomePage;
