import { config } from 'dotenv';
import { MongoClient, Db, Collection } from 'mongodb';
import BlogPost from '~/models/schemas/BlogPost.schemas';
import Contract from '~/models/schemas/Contract.schemas';
import Order from '~/models/schemas/Order.schemas';
import OwnerVilla from '~/models/schemas/OwnerVilla.schemas';
import Project from '~/models/schemas/Project.schemas';
import RefreshToken from '~/models/schemas/RefreshToken.schema';
import Subdivision from '~/models/schemas/Subdivision.schemas';
import User from '~/models/schemas/User.schemas';
import Villa from '~/models/schemas/Villa.schemas';
config();
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@theoasisluxury.vuzyle1.mongodb.net/?retryWrites=true&w=majority`;
// const uri = 'mongodb+srv://bichphuong13042002:bipu13042002@bipu1304.kbgoy1k.mongodb.net/?retryWrites=true&w=majority';
class DatabaseService {
  private client: MongoClient;
  private db: Db;
  constructor() {
    this.client = new MongoClient(uri);
    this.db = this.client.db(process.env.DB_NAME);
  }
  async connect() {
    try {
      //   await this.client.db(process.env.DB_NAME).command({ ping: 1 })
      await this.db.command({ ping: 1 });
      console.log('Pinged your deployment. You successfully connected to MongoDB with Project TheOasisLuxury!');
    } catch (err) {
      console.log('lỗi trong quá trình kết nối', err);
      throw err;
    }
  }
  get users(): Collection<User> {
    return this.db.collection(process.env.DB_COLLECTION_USER as string);
  }
  get refreshTokens(): Collection<RefreshToken> {
    return this.db.collection(process.env.DB_COLLECTION_REFRESHTOKEN as string);
  }
  get projects(): Collection<Project> {
    return this.db.collection(process.env.DB_COLLECTION_PROJECT as string);
  }
  get subdivisions(): Collection<Subdivision> {
    return this.db.collection(process.env.DB_COLLECTION_SUBDIVISION as string);
  }
  get villas(): Collection<Villa> {
    return this.db.collection(process.env.DB_COLLECTION_VILLA as string);
  }
  get blogPosts(): Collection<BlogPost> {
    return this.db.collection(process.env.DB_COLLECTION_BLOGPOST as string);
  }
  get contracts(): Collection<Contract> {
    return this.db.collection(process.env.DB_COLLECTION_CONTRACT as string);
  }
  get ownerVillas(): Collection<OwnerVilla> {
    return this.db.collection(process.env.DB_COLLECTION_OWNERVILLA as string);
  }
  get orders(): Collection<Order> {
    return this.db.collection(process.env.DB_COLLECTION_ORDER as string);
  }
}
const databaseService = new DatabaseService();
export default databaseService;
