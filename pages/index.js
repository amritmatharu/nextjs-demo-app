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
  };
}
export default HomePage;
