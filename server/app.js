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

// Gets all items and outfits to display to the closet
app.get('/closet', async (req, res) => {
    const items = await supabase.from('Items').select('*');
    const outfits = await supabase.from('Outfits').select('*');

    const formattedItems = items.data.map(item => {
        if (item.image_url != null) {
            const { data: publicUrlData } = supabase.storage.from('item_images').getPublicUrl(item.image_url);
            publicUrl = publicUrlData.publicUrl;
        } else {
            publicUrl = null;
        }
        
        return {
            id: item.id,
            name: item.name,
            description: item.description,
            image: publicUrl,
        }
    });

    const formattedOutfits = outfits.data.map(outfit => {
        return {
            id: outfit.id,
            name: outfit.name,
            description: outfit.description,
            image: null,
        }
    });

    res.status(200).json({item: formattedItems, outfit: formattedOutfits});
});

app.post('/api/item/additem', async (req, res) => {
    try {
        const { name, color, brand, type, is_available, price, age, popularity, tags, material, occasion, image_url } = req.body;

        const { data, error } = await supabase
            .from('Items')
            .insert([{ name, color, brand, type, isAvailable: is_available, price, age, popularity, tags, material, occasion, image_url }])
            .select();

        if (error) throw error;

        res.status(201).json(data[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

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