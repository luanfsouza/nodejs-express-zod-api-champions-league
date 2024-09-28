import {
  Document,
  Filter,
  InsertManyResult,
  MongoClient,
  ObjectId,
  ServerApiVersion,
  UpdateResult,
  WithId,
} from "mongodb";

import { PlayerModel } from "../models/playerModel";
import { StatisticModel } from "../models/statisticsModel";

const uri = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@teste01.ne3r4.mongodb.net/?retryWrites=true&w=majority&appName=teste01`;
//const database = ;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
const connectToMongoDb = async () => {
  try {
    await client.connect();
    console.log("connected to Mongo");
  } catch (error) {
    console.log("Erro to connect to Mongo: ", error);
  }
};
const desconnectToMongoDb = async () => {
  await client.close();
  console.log("desconectado");
};
export const CreatePlayer = async (
  data: PlayerModel
): Promise<ObjectId | null> => {
  try {
    await connectToMongoDb();
    const myDB = client.db("champions-league");
    await myDB.command({ ping: 1 });
    const myColl = myDB.collection("player");
    const result = await myColl.insertOne(data);
    return result.insertedId;
  } catch (error) {
    console.error("Error to create a new player: ", error);
    return null;
  } finally {
    await desconnectToMongoDb();
  }
};

export const CreateManyPlayer = async (data: PlayerModel[]):Promise<InsertManyResult<any> | null> => {
  try{
    await connectToMongoDb();
  const myDb = client.db("champions-league");
  const myColl = myDb.collection("player")
  const response = myColl.insertMany(data)
  return response
  }catch(error){
    console.log("Cannot insert many player{} to Mongo: ", error)
    return null
  }
  
  
};

export const findAllPlayers = async (): Promise<PlayerModel[] | null> => {
  try {
    await connectToMongoDb();
    const myDB = client.db("champions-league");
    await myDB.command({ ping: 1 });
    const myColl = myDB.collection<PlayerModel>("player");
    const response: PlayerModel[] = await myColl.find({}).toArray();
    return response;
  } catch (error) {
    console.error("Error to find player: ", error);
    return null;
  } finally {
    await desconnectToMongoDb();
  }
};

export const findPlayerById = async (
  id: string
): Promise<WithId<PlayerModel> | null> => {
  try {
    await connectToMongoDb();
    const myDB = client.db("champions-league");
    await myDB.command({ ping: 1 });
    const myColl = myDB.collection("player");
    const player = await myColl.findOne<PlayerModel>(new ObjectId(id));

    return player;
  } catch (error) {
    console.error("Error to find player by id:", error);
    return null;
  } finally {
    await desconnectToMongoDb();
  }
};

export const deletePlayerById = async (id: string): Promise<any | null> => {
  try {
    const filter: Filter<Document> = { _id: new ObjectId(id) };
await connectToMongoDb()
    const myDB = client.db("champions-league");
    await myDB.command({ ping: 1 });
    const myColl = myDB.collection("player");
    
    const response = await myColl.findOne(filter);

    if (response == null) {
      return response;
    } else {
      const player = await myColl.deleteOne(filter);
      return player;
    }
  } catch (error) {
    console.error("Error to delete player: ", error);
    return null;
  } finally {
    await desconnectToMongoDb();
  }
};

export const updatePlayerById = async (
  id: string,
  data: StatisticModel
): Promise<UpdateResult<PlayerModel> | null> => {
  try {
    const filter: Filter<Document> = { _id: new ObjectId(id) };
    await client.connect()
    const myDB = client.db("champions-league");
    await myDB.command({ ping: 1 });
    const myColl = myDB.collection<PlayerModel>("player");
    const response = await myColl.findOne(filter);
    if (response == null) {
      return response;
    } else {
      const player = await myColl.updateOne(filter, {
        $set: {
          statistics: {
            Overall: data.statistics.Overall,
            Pace: data.statistics.Pace,
            Shooting: data.statistics.Shooting,
            Passing: data.statistics.Passing,
            Dribbling: data.statistics.Dribbling,
            Defending: data.statistics.Defending,
            Physical: data.statistics.Physical,
          },
        },
      });
      return player;
    }
  } catch (error) {
    console.error("Error to update player: ", error);
    return null;
  } finally {
    await desconnectToMongoDb();
  }
};
