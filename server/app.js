const supabase = require("./supabaseClient");
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8000;

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());


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

app.patch('/api/item/updateitem', async (req, res) => {
    try {
        const { id, ...updates } = req.body;

        const { data, error } = await supabase
            .from('Items')
            .update(updates)
            .eq('id', id)
            .select();

        if (error) throw error;

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.patch('/api/outfit/updateoutfit', async (req, res) => {
    try {
        const { id, ...updates } = req.body;

        const { data, error } = await supabase
            .from('Outfits')
            .update(updates)
            .eq('id', id)
            .select();

        if (error) throw error;

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Listening...");
    else 
        console.log("Error occurred, server can't start", error);
    }
);