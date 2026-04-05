const supabase = require("./supabaseClient");
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8000;

app.use(cors({
  origin: 'http://localhost:3000'
}));


app.get('/', async (req, res)=>{
    res.status(200);
    const data = await supabase.from('Items').select('*');
    res.send(data);
});

app.get('/test', async (req, res) => {
    res.status(200);
    const data = await supabase.from('Items').select('*');
    const { data: publicUrlData } = supabase.storage.from('item_images').getPublicUrl("white_hoodie.jpg");
    const publicUrl = publicUrlData.publicUrl;

    res.json(publicUrl);
})


app.listen(PORT, (error) =>{
    if(!error)
        console.log("Listening...");
    else 
        console.log("Error occurred, server can't start", error);
    }
);