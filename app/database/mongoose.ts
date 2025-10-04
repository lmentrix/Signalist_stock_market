import * as mongoose from "mongoose";

const MONGODB_URI=process.env.MONGODB_URI
declare global {
    var mongooseCache:{
        conn: typeof mongoose | null
        promise: Promise<typeof mongoose> | null

    }
}

let cached = global.mongooseCache

if(!cached){
    cached = global.mongooseCache = {conn: null, promise: null }

}

export  const  connectToDatabase = async ()=>{
    if(!MONGODB_URI) throw new Error('mongo db uri not exist')
    if(cached.conn) return cached.conn
    if(!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {bufferCommands: false})
    }
    
    try {
        cached.conn = await cached.promise
        
    }catch (e) {
        cached.promise = null
        throw e
    }

    console.log(`connected ${process.env.NODE_ENV} ${MONGODB_URI}`)
}