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


app.listen(PORT, (error) =>{
    if(!error)
        console.log("Listening...");
    else 
        console.log("Error occurred, server can't start", error);
    }
);