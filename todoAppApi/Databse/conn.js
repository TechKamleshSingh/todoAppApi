import mongoose from "mongoose"

const connectDB = async ()=> {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database Connected Successfully...!")
    } catch (error) {
        console.log(error)
    }
}

mongoose.connection.on("disconnected", ()=> {
    console.log('Mongodb Disconnected')
})

mongoose.connection.on('connected', ()=> {
    console.log('Mongodb Connected')
})

export default connectDB;