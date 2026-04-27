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


app.post('/api/outfit', async (req, res) => {
    try {
        const { name, description, item_ids, popularity, isAvailable, occasion, image_name } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({ error: 'Outfit name is required' });
        }

        const insertData = {
            name: name.trim(),
            description: description ?? '',
            item_ids: Array.isArray(item_ids) ? item_ids.map(Number) : [],
            popularity: popularity || null,
            isAvailable: isAvailable ?? true,
        };
        if (occasion) insertData.occasion = occasion;
        if (image_name) insertData.image_name = image_name;

        const { data, error } = await supabase
            .from('Outfits')
            .insert(insertData)
            .select()
            .single();

        if (error) throw error;

        res.status(201).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/items', async (req, res) => {
    try {
        const { data, error } = await supabase.from('Items').select('*');
        if (error) throw error;

        const items = data.map(item => {
            let imageUrl = '';
            if (item.image_url) {
                const { data: publicUrlData } = supabase.storage
                    .from('item_images')
                    .getPublicUrl(item.image_url);
                imageUrl = publicUrlData.publicUrl;
            }
            return {
                id: String(item.id),
                name: item.name,
                imageUrl,
                type: item.type ?? 'Other',
            };
        });

        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/outfit/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const { data: outfit, error: outfitError } = await supabase
            .from('Outfits')
            .select('*')
            .eq('id', id)
            .single();

        if (outfitError) {
            if (outfitError.code === 'PGRST116') {
                return res.status(404).json({ error: 'Outfit not found' });
            }
            throw outfitError;
        }

        let outfitImage = null;
        if (outfit.image_name) {
            const { data: publicUrlData } = supabase.storage
                .from('outfit_images')
                .getPublicUrl(outfit.image_name);
            outfitImage = publicUrlData.publicUrl;
        }

        let items = [];
        if (Array.isArray(outfit.item_ids) && outfit.item_ids.length > 0) {
            const { data: itemRows, error: itemError } = await supabase
                .from('Items')
                .select('*')
                .in('id', outfit.item_ids);

            if (itemError) throw itemError;

            items = itemRows.map(item => {
                let image = null;
                if (item.image_url) {
                    const { data: publicUrlData } = supabase.storage
                        .from('item_images')
                        .getPublicUrl(item.image_url);
                    image = publicUrlData.publicUrl;
                }
                return {
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    image,
                };
            });
        }

        res.status(200).json({
            outfit: {
                id: outfit.id,
                name: outfit.name,
                description: outfit.description,
                image: outfitImage,
                tags: outfit.tags ?? [],
                isAvailable: outfit.isAvailable,
                isLiked: outfit.isLiked ?? false,
                occasion: outfit.occasion,
                popularity: outfit.popularity,
            },
            items,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
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