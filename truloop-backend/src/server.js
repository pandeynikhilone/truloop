import app from './app.js'
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT || 5000;
connectDB();

app.listen(PORT, ()=> {
    console.log(`Server running at port ${PORT}`);
});

app.use(cors({
  origin: "http://localhost:3000"
}));