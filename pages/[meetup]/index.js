import MeetupDetails from "../../components/meetups/MeetupDetails";
import { MongoClient, ObjectId } from "mongodb";

const MeetupDetail = (props) => {
  return (
    <MeetupDetails
      image={props.meetupData.image}
      title={props.meetupData.title}
      description={props.meetupData.description}
      address={props.meetupData.address}
    />
  );
};
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://amritkr:waheguru@cluster0.cp44usm.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const collectionDB = db.collection("meetups");
  const meetups = await collectionDB.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: true,
    paths: meetups.map((meet) => ({
      params: {
        meetup: meet._id.toString(),
      },
    })),
  };
}
export async function getStaticProps(context) {
  const meetupId = context.params.meetup;
  console.log("meetupId: ", meetupId);
  const client = await MongoClient.connect(
    "mongodb+srv://amritkr:waheguru@cluster0.cp44usm.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const collectionDB = db.collection("meetups");
  const selecetdMeetup = await collectionDB.findOne({
    _id: ObjectId(meetupId),
  });
  console.log("selecetdMeetup: ", selecetdMeetup);
  client.close();
  return {
    props: {
      meetupData: {
        id: selecetdMeetup._id.toString(),
        title: selecetdMeetup.title,
        description: selecetdMeetup.description,
        address: selecetdMeetup.address,
        image: selecetdMeetup.image,
      },
    },
  };
}
export default MeetupDetail;
