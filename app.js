const express=require('express')
const app=express()
const tasks=require('./routes/tasks')
const connectDB=require('./db/connect')
require('dotenv').config()

app.use(express.static('./public'))
app.use(express.json())
const notfound=require('./middleware/not-found')
const errorHandlerMiddleware=require('./middleware/error-handler')

app.use('/api/v1/tasks',tasks) 
app.use(notfound)
app.use(errorHandlerMiddleware)
const port=process.env.PORT || 3000

const start=async ()=>{
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`listening on port ${port}`))
    } catch (error){
        console.log(error)
    }
}

start()