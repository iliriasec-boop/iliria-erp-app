'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Category = { id:number; code:number; name:string }
type Product = {
  id:number; category_id:number; sku:string|null; name:string; description:string;
  avg_cost:number; sale_price:number; stock:number; image_url:string|null
}

export default function ProductsPage(){
  const [cats,setCats]=useState<Category[]>([])
  const [rows,setRows]=useState<Product[]>([])
  const [form,setForm]=useState({category_id:'', name:'', description:'', avg_cost:'0', sale_price:'0', stock:'0'})
  const [file,setFile]=useState<File|null>(null)

  const load = async()=>{
    const { data: c } = await supabase.from('core.categories').select('id,code,name').order('code')
    setCats((c||[]) as any)
    const { data: p } = await supabase.from('core.products').select('*').order('id', { ascending: false })
    setRows((p||[]) as any)
  }
  useEffect(()=>{ load() },[])

  const save = async()=>{
    if(!form.category_id || !form.name) return alert('Κατηγορία & Όνομα υποχρεωτικά')

    let image_url: string | undefined = undefined
    if(file){
      const path = `${Date.now()}-${file.name}`
      const { data, error } = await supabase.storage.from('product-images').upload(path, file)
      if(error) return alert(error.message)
      image_url = data?.path
    }

    const payload = {
      category_id: Number(form.category_id),
      name: form.name,
      description: form.description,
      avg_cost: Number(form.avg_cost),
      sale_price: Number(form.sale_price),
      stock: Number(form.stock),
      image_url
    }
    const { error } = await supabase.from('core.products').insert(payload)
    if(error) return alert(error.message)

    setForm({category_id:'', name:'', description:'', avg_cost:'0', sale_price:'0', stock:'0'})
    setFile(null)
    load()
  }

  return (
    <main style={{padding:24}}>
      <h1>Αποθήκη</h1>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, alignItems:'end', maxWidth:1000}}>
        <div>
          <label>Κατηγορία</label>
          <select value={form.category_id} onChange={e=>setForm({...form,category_id:e.target.value})} style={{width:'100%', padding:8, border:'1px solid #ccc'}}>
            <option value="">—</option>
            {cats.map(c=> <option key={c.id} value={c.id}>{String(c.code).padStart(2,'0')} — {c.name}</option>)}
          </select>
        </div>
        <div>
          <label>Όνομα</label>
          <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} style={{width:'100%', padding:8, border:'1px solid #ccc'}} />
        </div>
        <div>
          <label>Τιμή Πώλησης (€)</label>
          <input type="number" value={form.sale_price} onChange={e=>setForm({...form,sale_price:e.target.value})} style={{width:'100%', padding:8, border:'1px solid #ccc'}} />
        </div>
        <div style={{gridColumn:'1 / span 3'}}>
          <label>Περιγραφή</label>
          <input value={form.description} onChange={e=>setForm({...form,description:e.target.value})} style={{width:'100%', padding:8, border:'1px solid #ccc'}} />
        </div>
        <div>
          <label>Μ.Ο. Κόστους (€)</label>
          <input type="number" value={form.avg_cost} onChange={e=>setForm({...form,avg_cost:e.target.value})} style={{width:'100%', padding:8, border:'1px solid #ccc'}} />
        </div>
        <div>
          <label>Απόθεμα</label>
          <input type="number" value={form.stock} onChange={e=>setForm({...form,stock:e.target.value})} style={{width:'100%', padding:8, border:'1px solid #ccc'}} />
        </div>
        <div>
          <label>Εικόνα</label>
          <input type="file" onChange={e=>setFile(e.target.files?.[0]||null)} />
        </div>
        <button onClick={save} style={{padding:10}}>Αποθήκευση</button>
      </div>

      <table style={{marginTop:24, width:'100%', borderCollapse:'collapse'}}>
        <thead>
          <tr style={{textAlign:'left', borderBottom:'1px solid #ddd'}}>
            <th style={{padding:8}}>SKU</th>
            <th style={{padding:8}}>Όνομα</th>
            <th style={{padding:8}}>Κατηγορία</th>
            <th style={{padding:8}}>Τιμή</th>
            <th style={{padding:8}}>Stock</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r=>(
            <tr key={r.id} style={{borderTop:'1px solid #eee'}}>
              <td style={{padding:8}}>{r.sku}</td>
              <td style={{padding:8}}>{r.name}</td>
              <td style={{padding:8}}>{cats.find(c=>c.id===r.category_id)?.name}</td>
              <td style={{padding:8}}>€ {Number(r.sale_price).toFixed(2)}</td>
              <td style={{padding:8}}>{Number(r.stock).toFixed(3)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
