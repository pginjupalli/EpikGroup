
'use client'

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase
        .from('Items')
        .select('*');

      if (error) {
        console.error('Error fetching items:', error.message);
      } 
      else {
        setItems(data);
        console.log(data);
      }

    }
    fetchItems();
  }, []);

  return (
    <p>Home Page</p>
  );
}
